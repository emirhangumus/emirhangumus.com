import Link from "next/link";

const quotes = [
    "Hayatta başarılı olmanın sırrı, kendini sevmek ve inanmaktır.",
    "Gerçek mutluluk, başka insanlara hizmet etmekten gelir.",
    "Bir adım atmak, bin düşünmekten iyidir.",
    "Hayatta en büyük zafer, hiçbir zaman düşmemekte değil, her düştüğünde yeniden kalkabilmektir.",
    "Güçlü olanlar, özür dilemeyi ve affetmeyi bilenlerdir.",
    "Hayatta en önemli şeylerden biri, kendinize ve başkalarına karşı dürüst olmaktır.",
    "Hayatta hiçbir şey tesadüf değildir, her şeyin bir sebebi ve anlamı vardır.",
    "Başarılı olmak için, önce hayal edin, sonra da çalışın.",
    "Hayatta en büyük engel, kendimize inanmamamızdır.",
    "Hayatınızın anlamı, başkalarına yardım etmekle ve dünyayı daha iyi bir yer haline getirmekle ilgilidir.",
    "Aşkın her zaman mantığı yoktur. Kalbin, akıl yürütmek için değil, sadece sevmek için var olduğunu unutmayalım.",
    "Aşk hayatımızın anlamını verir. Bir insanın kendini tam hissetmesi için aşka ihtiyacı vardır.",
    "Her insanın hayatında bir kez gerçek aşkı bulması gerekir. Aşk, insanı kendinden geçirir ve hayatının anlamını değiştirir.",
    "Bir insanın sevgilisi için yapamayacağı şey yoktur. Aşk insanı sınırlarını zorlamaya ve kendini aşmaya itebilir.",
    "Aşk, insanın içindeki en güzel duygulardan biridir. Aşkı yaşayan insan, hayatın geri kalanında her şeye daha farklı bakar.",
    "Aşk, her şeyden önce fedakarlık demektir. Kendini sevdiğin insanın mutluluğu için feda etmek, gerçek aşkın en güzel örneğidir.",
    "Aşkta zaman ve mekan kavramları yoktur. İki insanın sevgisi, her şeyin üstesinden gelir ve sonsuz bir şekilde devam eder.",
    "Hayatta hiçbir şey tesadüf değildir. Her şeyin bir sebebi ve anlamı vardır.",
    "Başarının anahtarı, sadece işinize odaklanmak değil, aynı zamanda insanlarla ilişki kurmaktır.",
    "Yaşamak, tehlike almadan hayatta kalmaktan daha fazlasıdır.",
    "Bir insanın korkusuz olması değil, korkusuna rağmen hareket edebilmesi önemlidir.",
    "Geçmişin bizi nereden getirdiği, gelecekte bizi nereye götürecektir.",
    "Zorluklar, sizi hayatta tutan şeydir. Kendinize meydan okumayı bıraktığınızda, hayatınızın anlamını kaybedersiniz.",
    "Herhangi bir şeyin hayatınızı etkilemesine izin vermeyin, çünkü sadece kendinizin ona izin vermenize izin verdiğini unutmayın.",
    "İnsanların hayatında bir kez bile olsa, gerçek bir aşkı yaşaması gerekir. Aşk, her şeyin üstesinden gelebilir ve herkesi değiştirebilir.",
    "Gerçek aşk, sadece kalbin değil, ruhun da birleşmesidir.",
    "Aşk, insanı değiştiren en güçlü duygudur. Sevdiğimiz insan için yapabileceklerimizin sınırı yoktur.",
    "'Bekle' dedi gitti. Ben beklemedim, o da gelmedi.",
    "Özledim seni Müzeyyen'im",
];

/**
 * sevin arkadaşlar. Her şeyden öde, herkesten çok ve en çok da bir daha hiç sevilmeyecekmiş gibi sevin.
 * evet, bu halde çok üzülebilirsiniz, kırılabilirsiniz, yıpranabilirsiniz fakat bu en gerçeği ve en doğrusu olacaktır.
 * siz duygularınıza sadık kalın. o ne isterse o olabilir. ne isterse yapabilir ve siz buna karışamazsınız.
 * fakat bunu bile sevin çünkü elinizde sevgiden başka bir şey kalmayacak en sonunda.
 * güzel zamanları hatırlayın, güzel anıları hatırlayın, güzel duyguları hatırlayın.
 * onunda birlikte yaşayın ve yine onunla birlikte ölün, kafanızda.
 * 
 * 21.04.2023 - M.E.B. - Ah canım Müzeyyen'im benim. 🦄❤️🦢
 * ayrılalı kaç gün oldum saymadım ama eğer bunu okursan söylemek isterim ki iyi değilim.
 * gerçi bu senin için önemli mi bilmiyorum. neyse. sevin arkadaşlar. sevin. sevin. sevin.
 */

export default function Footer() {
    return (
        <footer className="bg-cinder-950 bg-opacity-10 mt-4 border-t border-cinder-800">
            <div className="max-w-7xl mx-auto py-8 px-4 overflow-hidden sm:px-6 lg:px-8">
                <p className="text-center text-sm text-cinder-500">
                    {quotes[Math.floor(Math.random() * quotes.length)]}
                </p>
                <p className="mt-4 text-center text-xs text-cinder-500">
                    &copy; {new Date().getFullYear()} <Link href="/" className="hover:text-cinder-400">Emirhan Gümüş</Link>
                </p>
            </div>
        </footer >
    )
}