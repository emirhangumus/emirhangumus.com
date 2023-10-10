import { useState } from "react";

export default function ContactForm() {

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");

	const [status, setStatus] = useState({
		submitted: false,
		submitting: false,
		info: { error: false, msg: "" },
	});

	const onSubmit = async () => {

		if (!name || !email || !subject || !message) {
			setStatus({
				submitted: false,
				submitting: false,
				info: { error: true, msg: "🤔 Bazı alanlar boş sanırım. 🤔" },
			});
			return;
		}

		setStatus({
			submitted: false,
			submitting: true,
			info: { error: false, msg: "" },
		})

		let data = await fetch("/api/contact", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name,
				email,
				subject,
				message,
			}),
		}).then((res) => res.json());

		if (data.success) {
			setStatus({
				submitted: true,
				submitting: false,
				info: { error: false, msg: "🥳 Mesajınızı aldım. 🥳" },
			});
			setName("");
			setEmail("");
			setSubject("");
			setMessage("");
		}
		else {
			setStatus({
				submitted: false,
				submitting: false,
				info: { error: true, msg: "😔 Mesajınız gelmedi. 😔" },
			});
		}
	};


	return (
		<>
			<form className="flex flex-col gap-4 pb-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
				<div className="flex flex-col gap-2">
					<label htmlFor="name">Adınız</label>
					<input
						type="text"
						name="name"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="rounded-md px-2 py-1 bg-cinder-900 outline-none border border-cinder-800 focus:border-cinder-700 w-full"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="email">E-posta Adresiniz</label>
					<input
						name="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="rounded-md px-2 py-1 bg-cinder-900 outline-none border border-cinder-800 focus:border-cinder-700 w-full"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="subject">Konu</label>
					<input
						type="text"
						name="subject"
						id="subject"
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
						className="rounded-md px-2 py-1 bg-cinder-900 outline-none border border-cinder-800 focus:border-cinder-700 w-full"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="message">Mesajınız</label>
					<textarea
						name="message"
						id="message"
						rows={5}
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						className="rounded-md px-2 py-1 bg-cinder-900 outline-none border border-cinder-800 focus:border-cinder-700 w-full"
					/>
				</div>
				<div>
					<button
						type="submit"
						className={`rounded-md px-2 py-1 bg-cinder-900 outline-none border border-cinder-800 focus:border-cinder-700 w-full ${status.submitting
							? "cursor-not-allowed opacity-50"
							: "hover:bg-cinder-800"
							}`}

						onClick={onSubmit}
					>
						{status.submitting
							? !status.submitted
								? "Gönderiliyor..."
								: "Gönderildi"
							: "Gönder"
						}
					</button>
				</div>
				{status.info.error && (
					<p className="px-4 py-1 border-2 border-red-900 bg-red-900 bg-opacity-40 rounded-lg text-center">
						{status.info.msg}
					</p>
				)}
				{!status.info.error && status.info.msg && (
					<p className="px-4 py-1 border-2 border-green-900 bg-green-900 bg-opacity-40 rounded-lg text-center">
						{status.info.msg}
					</p>
				)}
				{/** loading */}
				{status.submitting && (
					<p className="px-4 py-1 border-2 border-yellow-900 bg-yellow-900 bg-opacity-40 rounded-lg text-center">
						🫡 Mesajınızı göndermeye çalışıyorum. 🫡
					</p>
				)}
			</form>
		</>
	)
};