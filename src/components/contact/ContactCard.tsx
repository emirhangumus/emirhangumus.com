import { Contact } from '@/interfaces/ContactInterface';
import React from 'react';

const ContactCard = ({ contact }: { contact: Contact }) => {
	return (
		<div className="bg-zinc-900 shadow overflow-hidden sm:rounded-lg">
			<div className='flex items-start justify-between px-4 py-5 sm:px-6'>
				<h3 className="text-lg leading-6 font-medium text-white">{contact.subject}</h3>
				<div className='flex flex-col items-end'>
					<h3 className="text-lg leading-6 font-medium text-white">{contact.name}</h3>
					<p className="mt-1 max-w-2xl text-sm text-gray-500">{contact.email}</p>
				</div>
			</div>
			<div className="border-t border-gray-200 px-4 py-5 sm:px-6">
				<dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
					<div className="sm:col-span-1">
						<dt className="text-sm font-medium text-gray-500">Mesaj</dt>
						<dd className="mt-1 text-sm text-white">{contact.message}</dd>
					</div>
				</dl>
			</div>
		</div>
	);
};

export default ContactCard;
