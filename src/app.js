import { TRIVIA_FACTS } from './trivia.js';

const CATEGORIES = [
  { id: 'animaky', label: 'Animáky' },
  { id: 'ceskoslovenske', label: 'Československé' },
  { id: 'americke', label: 'Americké' },
  { id: 'europske', label: 'Britské & európske' },
  { id: 'kultove', label: 'Kultové & netradičné' },
];

const FILMS = [
  { id: 'klaus', category: 'animaky', title: 'Klaus', year: 2019, image: 'https://upload.wikimedia.org/wikipedia/en/2/26/Klaus_poster.jpeg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled' },
  { id: 'grinch', category: 'animaky', title: 'Ako Grinch ukradol Vianoce', year: 2000, image: 'https://media.senscritique.com/media/000017493316/0/le_grinch.jpg' },
  { id: 'grinch-animated', category: 'animaky', title: 'Grinch', year: 2018, image: 'https://upload.wikimedia.org/wikipedia/en/4/4f/The_Grinch%2C_final_poster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled' },
  { id: 'polar-express', category: 'animaky', title: 'Polárny expres', year: 2004, image: 'https://upload.wikimedia.org/wikipedia/en/2/24/The_Polar_Express_%282004%29_poster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled' },
  { id: 'christmas-carol', category: 'animaky', title: 'Vianočná koleda', year: 2009, image: 'https://m.media-amazon.com/images/M/MV5BMTM1MTI5ODU4MV5BMl5BanBnXkFtZTcwNTYyNTU4Mg%40%40._V1_.jpg' },
  { id: 'nightmare-before-christmas', category: 'animaky', title: 'Predvianočná nočná mora', year: 1993, image: 'https://upload.wikimedia.org/wikipedia/en/9/9a/The_nightmare_before_christmas_poster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled' },
  { id: 'arthur-christmas', category: 'animaky', title: 'Arthur zachraňuje Vianoce', year: 2011, image: 'https://upload.wikimedia.org/wikipedia/en/e/ed/Arthur_Christmas_Poster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled' },
  { id: 'mickey-christmas-carol', category: 'animaky', title: 'Mickeyho vianočná koleda', year: 1983, image: 'https://cdn.yori.to/titles/tt0085936/poster.jpg' },
  { id: 'snowman', category: 'animaky', title: 'Snehuliak', year: 1982, image: 'https://www.cineadaffiches.com/cdn/shop/products/57_aaabd3dc-45b2-4ff2-b866-d5354bb82f4f_1200x1200.jpg?v=1604516403' },
  { id: 'robin-robin', category: 'animaky', title: 'Robin Robin', year: 2021, image: 'https://image.tmdb.org/t/p/original/p9iZ9OVPvr9tSqruiNgjReGvYB9.jpg' },
  { id: 'the-star', category: 'animaky', title: 'Hviezda', year: 2017, image: 'https://image.tmdb.org/t/p/original/mwiEcbdKOEXuOSPyGblkAkwEzeo.jpg' },
  { id: 'legendary-guardians', category: 'animaky', title: 'Legendárna partia', year: 2012, image: 'https://upload.wikimedia.org/wikipedia/en/9/92/Rise_of_the_Guardians_poster.jpg' },
  { id: 'home-alone', category: 'americke', title: 'Sám doma', year: 1990, image: 'https://upload.wikimedia.org/wikipedia/en/7/76/Home_alone_poster.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled' },
  { id: 'home-alone-2', category: 'americke', title: 'Sám doma 2: Stratený v New Yorku', year: 1992, image: 'https://upload.wikimedia.org/wikipedia/en/5/50/Home_Alone_2.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled' },
  { id: 'home-alone-3', category: 'americke', title: 'Sám doma 3', year: 1997, image: 'https://www.movieposters.com/cdn/shop/products/home_alone_three_ver3_1024x1024.jpg?v=1762962148' },
  { id: 'home-alone-4', category: 'americke', title: 'Sám doma 4', year: 2002, image: 'https://image.tmdb.org/t/p/original/qRktvMOO2QaCL7gvNyvZDoxPOZj.jpg?t=1770616637' },
  { id: 'home-alone-5', category: 'americke', title: 'Sám doma 5: Vianočná lúpež', year: 2012, image: 'https://image.tmdb.org/t/p/original/6bZdqzK3le84IVUIJCppYMG7UeA.jpg' },
  { id: 'home-sweet-home-alone', category: 'americke', title: 'Všade dobre, sám doma najlepšie', year: 2021, image: 'https://image.tmdb.org/t/p/original/fP3VvqUjEBjawxZHL4sYCq2ZdJD.jpg' },
  { id: 'elf', category: 'americke', title: 'Elf', year: 2003, image: 'https://upload.wikimedia.org/wikipedia/en/d/df/Elf_movie.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled' },
  { id: 'christmas-vacation', category: 'americke', title: 'Bláznivé Vianoce', year: 1989, image: 'https://filmartgallery.com/cdn/shop/files/National-Lampoons-Christmas-Vacation-Vintage-Movie-Poster-Original_19dd8462_2000x.jpg?v=1741230650' },
  { id: 'santa-clause', category: 'americke', title: 'Santa Claus', year: 1994, image: 'https://www.originalfilmart.co.uk/cdn/shop/products/SantaClause_1994_original_film_art_5000x.jpg?v=1640388246' },
  { id: 'miracle-34th-street', category: 'americke', title: 'Zázrak na 34. ulici', year: 1994, image: 'https://cdn11.bigcommerce.com/s-v1cc48yjt1/images/stencil/1280x1280/products/11268/12465/Miracle_on_34th_Street__91425.1765040386.jpg?c=2' },
  { id: 'four-christmases', category: 'americke', title: 'Štyri Vianoce', year: 2008, image: 'https://cdn11.bigcommerce.com/s-yzgoj/images/stencil/1280x1280/products/389254/3782440/apiluappv__41192.1625662576.jpg?c=2' },
  { id: 'christmas-chronicles', category: 'americke', title: 'Vianočné kroniky', year: 2018, image: 'https://baronessbooktrove.com/wp-content/uploads/2018/10/The-Christmas-Chronicles-Netflix-2018.jpg' },
  { id: 'jingle-all-the-way', category: 'americke', title: 'Rolničky, kam sa pozrieš', year: 1996, image: 'https://m.media-amazon.com/images/M/MV5BMmJlYzViNzctMjQ1Ni00ZWQ4LThkN2YtMzI2ZGU5Nzk0NTAyXkEyXkFqcGdeQXVyMTQxNzMzNDI%40._V1_.jpg' },
  { id: 'scrooged', category: 'americke', title: 'Návrat do Vianoc', year: 1988, image: 'https://m.media-amazon.com/images/M/MV5BYWY3ODUyZTQtMTQyZS00ZWIyLTk3M2YtYzU5ZWQ3MTEwZGU1XkEyXkFqcGc%40._V1_.jpg' },
  { id: 'bad-santa', category: 'americke', title: 'Santa je úchyl!', year: 2003, image: 'https://www.originalfilmart.com/cdn/shop/products/BadSanta_2003_original_film_art_5000x.jpg?v=1640389927' },
  { id: 'christmas-story', category: 'americke', title: 'Vianočný príbeh', year: 1983, image: 'https://filmartgallery.com/cdn/shop/files/A-Christmas-Story-Vintage-Movie-Poster-Original_916caa3f_5000x.jpg?v=1771937986' },
  { id: 'dennis-christmas', category: 'americke', title: 'Postrach Denis a Vianoce', year: 2007, image: 'https://prod-fdb-storage.fra1.cdn.digitaloceanspaces.com/thumbnails/w3840/galleries/fhj0cfv0m2mufjgco18w.jpeg' },
  { id: 'jack-frost', category: 'americke', title: 'Jack Frost', year: 1998, image: 'https://www.impawards.com/1998/posters/jack_frost.jpg' },
  { id: 'three-wishes', category: 'ceskoslovenske', title: 'Tri oriešky pre Popolušku', year: 1973, image: 'https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/158/643/158643989_1e887d.jpg' },
  { id: 'with-you-world-fun', category: 'ceskoslovenske', title: 'S tebou ma baví svet', year: 1982, image: 'https://cdn.alza.cz/Foto/imggalery/Image/Article/stmbs%20text.jpg' },
  { id: 'cosy-dens', category: 'ceskoslovenske', title: 'Pelíšky', year: 1999, image: 'https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/165/049/165049346_5a5d1f.jpg' },
  { id: 'perinbaba', category: 'ceskoslovenske', title: 'Perinbaba', year: 1985, image: 'https://www.moviemeter.nl/images/cover/34000/34438.jpg' },
  { id: 'salt-gold', category: 'ceskoslovenske', title: 'Soľ nad zlato', year: 1982, image: 'https://kidstownm.citylife.sk/sites/default/files/akcia/plagat/KIDSTOWN/201711/48eaca54f2e586eebae34c3f20d43078.jpg' },
  { id: 'golden-star', category: 'ceskoslovenske', title: 'Princezná so zlatou hviezdou', year: 1959, image: 'https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/158/584/158584190_e58f90.jpg' },
  { id: 'proud-princess', category: 'ceskoslovenske', title: 'Pyšná princezná', year: 1952, image: 'https://i0.wp.com/easterneuropeanmovies.com/wp-content/uploads/327.jpg?fit=560%2C786&ssl=1' },
  { id: 'angel-lord', category: 'ceskoslovenske', title: 'Anjel Pána', year: 2005, image: 'https://img.ceskatelevize.cz/program/porady/1099641378/foto09/plakat.jpg' },
  { id: 'angel-lord-2', category: 'ceskoslovenske', title: 'Anjel Pána 2', year: 2016, image: 'https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/161/138/161138522_74daba.jpg' },
  { id: 'three-veterans', category: 'ceskoslovenske', title: 'Traja veteráni', year: 1983, image: 'https://i0.wp.com/easterneuropeanmovies.com/wp-content/uploads/81.jpg?fit=740%2C1040&ssl=1' },
  { id: 'immortal-aunt', category: 'ceskoslovenske', title: 'Nesmrteľná teta', year: 1993, image: 'https://n62.gonet.tv/api/obr/porad_booklet_53a425f5f494b3e30f9eaa93abe3c5c1-960.jpg' },
  { id: 'devil-knows-why', category: 'ceskoslovenske', title: 'Čert vie prečo', year: 2003, image: 'https://m.media-amazon.com/images/M/MV5BZWY5YzBkODQtNjMxNy00ZTk0LWFmMjYtYWU0MmMyMjBjZjRlXkEyXkFqcGc%40._V1_FMjpg_UX1000_.jpg' },
  { id: 'lotrando-zubejda', category: 'ceskoslovenske', title: 'Lotrando a Zubejda', year: 1997, image: 'https://www.mat.cz/kino/pict/program_movie_cz/face/790.jpg' },
  { id: 'cisars-baker-bakers-emperor', category: 'ceskoslovenske', title: 'Cisárov pekár – Pekárov cisár', year: 1951, image: 'https://prod-fdb-storage.fra1.cdn.digitaloceanspaces.com/thumbnails/w3840/galleries/4fvvhikin1uxpqqvklry.jpeg' },
  { id: 'madly-sad-princess', category: 'ceskoslovenske', title: 'Šíleně smutná princezna', year: 1968, image: 'https://prod-fdb-storage.fra1.cdn.digitaloceanspaces.com/thumbnails/w3840/galleries/n6zg2g7te7lbcw0holwn.jpeg' },
  { id: 'devils-not-jokes', category: 'ceskoslovenske', title: 'S čerty nejsou žerty', year: 1984, image: 'https://nfa.fra1.cdn.digitaloceanspaces.com/assets/filmy/scnz-poster.jpg' },
  { id: 'rysava-jalovica', category: 'ceskoslovenske', title: 'Rysavá jalovica', year: 1970, image: 'https://www.niagara.sk/images/products/big/rysava-jalovica.jpg' },
  { id: 'love-actually', category: 'europske', title: 'Láska nebeská', year: 2003, image: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Love_Actually_movie.jpg' },
  { id: 'the-holiday', category: 'europske', title: 'Prázdniny', year: 2006, image: 'https://media.jutarnji.hr/images/slike/2022/12/07/27231099.jpg' },
  { id: 'last-christmas', category: 'europske', title: 'Posledné Vianoce', year: 2019, image: 'https://br.web.img2.acsta.net/pictures/19/09/11/15/31/3986826.jpg' },
  { id: 'holdovers', category: 'europske', title: 'Zimné prázdniny', year: 2023, image: 'https://m.media-amazon.com/images/M/MV5BNDc2MzNkMjMtZDY5NC00NmQ0LWI1NjctZjRhNWIzZjc4MGRiXkEyXkFqcGdeQXVyMjkwOTAyMDU%40._V1_FMjpg_UX1000_.jpg' },
  { id: 'boy-called-christmas', category: 'europske', title: 'Chlapec menom Vianoce', year: 2021, image: 'https://cdn1.naekranie.pl/media/cache/amp/2021/11/Ch%C5%82opiec%20zwany%20Gwiazdk%C4%85_619e31dbd3faa.jpeg' },
  { id: 'man-who-invented-christmas', category: 'europske', title: 'Muž, ktorý vynašiel Vianoce', year: 2017, image: 'https://m.media-amazon.com/images/M/MV5BMTYwMjk1MTUzM15BMl5BanBnXkFtZTgwNDM2ODgwNDI%40._V1_.jpg' },
  { id: 'muppet-carol', category: 'kultove', title: 'Vianočná koleda Muppetov', year: 1992, image: 'https://upload.wikimedia.org/wikipedia/en/9/95/Muppet_christmas_carol.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled' },
  { id: 'family-stone', category: 'kultove', title: 'The Family Stone', year: 2005, image: 'https://m.media-amazon.com/images/M/MV5BNzY4ZGZjNDktMTBhMS00OWQ3LWIxZDItNGU5NjcyYzYxYTVhXkEyXkFqcGc%40._V1_.jpg' },
  { id: 'gremlins', category: 'kultove', title: 'Gremlins', year: 1984, image: 'https://www.mauvais-genres.com/32021-thickbox_default/gremlins-original-movie-poster-adv-27x41-in-1984-joe-dante-zach-galligan.jpg' },
  { id: 'family-man', category: 'kultove', title: 'Rodinný muž', year: 2000, image: 'https://m.media-amazon.com/images/M/MV5BYzYzMTQ4NDYtNWRkZi00NTYxLThlZDItMzI1MmU1MmU5ZWQ3XkEyXkFqcGdeQXVyNDA5Mjg5MjA%40._V1_FMjpg_UX1000_.jpg' },
  { id: 'last-holiday', category: 'kultove', title: 'Posledné prázdniny', year: 2006, image: 'https://public-website-assets.paramountpictures.com/paramount2025/s3fs-public/styles/poster_medium/public/lastholiday_en_800x1200.jpg?itok=EHBA1KdS' },
  { id: 'christmas-kranks', category: 'kultove', title: 'Vianoce u Krankov', year: 2004, image: 'https://i.pinimg.com/originals/31/4c/8d/314c8d922ed12029bef2082c65a98abc.jpg' },
];

const FILM_DETAILS = {
  klaus: 'Poštár Jesper sa ocitne v zamrznutom meste plnom hádok. S tajomným výrobcom hračiek Klausom začne potichu meniť jeho atmosféru darčekmi a láskavosťou.',
  grinch: 'Zelený samotár z hory neznáša vianočný ruch v mestečku, a tak sa rozhodne ukradnúť Vianoce. Malá Cindy-Lou mu však pripomenie, čo na nich naozaj záleží.',
  'grinch-animated': 'Grinch žije s verným Maxom nad mestečkom a plánuje obyvateľom prekaziť sviatky. Animovaná verzia rozpráva o tom, ako sa aj najväčší mrzút môže zmeniť.',
  'polar-express': 'Chlapec, ktorý začína pochybovať o Santovi, nastúpi na čarovný vlak smerujúci na Severný pól. Nočná cesta je dobrodružstvom o viere a detskej predstavivosti.',
  'christmas-carol': 'Lakomec Ebenezer Scrooge dostane počas Štedrého večera návštevu troch duchov. Ukážu mu minulosť, prítomnosť aj budúcnosť, ktorú si ešte môže zmeniť.',
  'nightmare-before-christmas': 'Jack Skellington objaví Vianočné mestečko a pokúsi sa sviatky uchopiť po svojom. Jeho temne hravý plán sa stretne s realitou sveta, ktorému nerozumie.',
  'arthur-christmas': 'Santov nešikovný, no odhodlaný syn Arthur vyráža na poslednú misiu. Jedno zabudnuté dieťa musí dostať svoj darček ešte pred svitaním.',
  'mickey-christmas-carol': 'Mickey, Goofy a ďalší disneyovskí hrdinovia rozprávajú Dickensovu koledu. Scrooge v nej dostane malú, svižnú a veľmi vianočnú lekciu.',
  snowman: 'Chlapec si postaví snehuliaka, ktorý počas noci ožije. Takmer bez slov vzniká poetická zimná cesta plná svetla, lietania a detského úžasu.',
  'robin-robin': 'Malá Robin vyrastá medzi myšami, no túži patriť do rodiny. Vianočná lúpežná výprava jej pomôže zistiť, kým vlastne je.',
  'the-star': 'Mladý osol Bo sa vydá za slobodou a nechtiac sa ocitne pri udalostiach prvých Vianoc. Dobrodružstvo sleduje príbeh z pohľadu zvieracích hrdinov.',
  'legendary-guardians': 'Keď Pitch začne ohrozovať detské sny, Santa, Zúbková víla, Sandman, Veľkonočný zajac a Jack Frost musia spojiť sily.',
  'home-alone': 'Kevin zostane na Vianoce sám doma a musí ochrániť dom pred dvojicou nešikovných zlodejov. Z improvizovaných pascí sa stane sviatočná klasika.',
  'home-alone-2': 'Kevin sa v New Yorku opäť stretne s Harrym a Marvom. Tentoraz chráni hotel aj hračkárstvo a pritom objaví, že na Vianoce nikto nechce zostať sám.',
  'home-alone-3': 'Osemročný Alex zostane doma s ovčími kiahňami, zatiaľ čo skupina špiónov hľadá počítačový čip ukrytý v jeho hračkárskom autíčku. Keď vtrhnú do domu, Alex si pripraví vlastné pasce.',
  'home-alone-4': 'Kevin trávi Vianoce v sídle otcovej priateľky, kde sa znovu objaví Marv so svojou pomocníčkou. Kevin musí prekaziť lúpež a zároveň dúfa, že dá rodičov opäť dohromady.',
  'home-alone-5': 'Finn Baxter sa s rodinou presťahuje do nového domu a myslí si, že v ňom straší. Keď sa objavia zlodeji, on a jeho sestra premenia dom na prekážkovú dráhu plnú pascí.',
  'home-sweet-home-alone': 'Max Mercer zostane cez sviatky sám doma, kým je jeho rodina v Japonsku. Manželský pár sa pokúsi dostať k vzácnemu dedičstvu v dome a Max ho bráni po svojom.',
  elf: 'Buddy, človek vychovaný škriatkami, odíde zo Severného pólu hľadať svojho otca do New Yorku. Jeho detská úprimnosť narazí na dospelý svet.',
  'christmas-vacation': 'Clark Griswold chce rodine pripraviť dokonalé Vianoce. Svetlá, návštevy aj susedia však jeho plán postupne menia na veľký sviatočný chaos.',
  'santa-clause': 'Po nečakanej nehode Santa Clausa preberie Scott Calvin jeho úlohu. S novým bruchom, bradou a povinnosťami zisťuje, čo znamená byť Santom.',
  'miracle-34th-street': 'Muž, ktorý tvrdí, že je skutočný Santa, sa ocitne pred súdom. Malé dievča a právnik sa snažia dokázať, že viera môže mať aj veľmi reálne miesto.',
  'four-christmases': 'Pár, ktorý sa chcel sviatkom vyhnúť, musí za jediný deň navštíviť všetky štyri rozvedené rodičovské domácnosti. Výlet odhalí viac, než čakali.',
  'christmas-chronicles': 'Súrodenci Kate a Teddy sa pokúsia natočiť Santu, no spôsobia nehodu jeho saní. Aby zachránili Vianoce, musia mu pomôcť doručiť zvyšné darčeky.',
  'jingle-all-the-way': 'Dvaja otcovia sa na Štedrý večer pustia do zúfalého lovu po najžiadanejšej hračke. Súťaž o posledný kus odhalí, čo chcú vlastne darovať svojim synom.',
  scrooged: 'Cynický televízny producent Frank Cross dostane vlastnú modernú verziu vianočnej koledy. Duchovia ho prinútia pozrieť sa na život mimo sledovanosti a úspechu.',
  'bad-santa': 'Zlodej prezlečený za obchodného Santu trávi sviatky podvodmi. Nečakané priateľstvo s osamelým chlapcom v ňom však začne prebúdzať zvyšky ľudskosti.',
  'christmas-story': 'Ralphie túži po vzduchovke a v predvianočnom svete rieši školu, rodinu aj nebezpečenstvo, že dospelí jeho vysnívaný darček nikdy nepochopia.',
  'dennis-christmas': 'Malý Denis sa počas Vianoc ocitne v blízkosti suseda Wilsona a svojou zvedavosťou rozvíri pokojné sviatky. Nevinné nápady spôsobia poriadnu komédiu.',
  'jack-frost': 'Otec, ktorý zomrie pri nehode, sa vďaka kúzlu vráti ako snehuliak. Dostane tak ešte jednu zimu, aby sa zblížil so synom a napravil, čo nestihol.',
  'three-wishes': 'Popoluška stretne v lese princa, ktorý sa ukrýva pred vlastným otcom. Tri čarovné oriešky jej pomôžu nájsť slobodu, lásku aj vlastnú cestu.',
  'with-you-world-fun': 'Traja otcovia vyrazia s deťmi na chalupu Apalucha v Beskydách. Pánska jazda so šiestimi deťmi sa rýchlo zmení na vyčerpávajúce, ale láskavé zimné dobrodružstvo.',
  'cosy-dens': 'Rodina a priatelia prežívajú posledné Vianoce v spoločnom byte v období spoločenských zmien. Láskavý humor sa mieša s nostalgiou a generačnými konfliktmi.',
  perinbaba: 'Perinbaba dohliada na sneh a osud Jakuba, ktorý vyrastá medzi ľuďmi a kúzlami. Rozprávka spája poetickú zimu s príbehom lásky a dospievania.',
  'salt-gold': 'Kráľ si myslí, že soľ nemá cenu, a vyženie dcéru Marušku. Až keď kráľovstvo pocíti jej absenciu, pochopí význam obyčajných vecí.',
  'golden-star': 'Princezná Lada uteká pred pyšným Kazisvetom a ukrýva sa pod myšacou čiapočkou. Rozprávková cesta smeruje k pravde, láske a odvahe.',
  'proud-princess': 'Pyšná princezná Krasomila sa musí naučiť skromnosti, keď sa do jej kráľovstva vydá prezlečený kráľ Miroslav. Humor a pesničky vedú k šťastnému koncu.',
  'angel-lord': 'Anjel Petronel dostane poslednú šancu napraviť svoju chybu na zemi. Spolu s čertom Uriášom sa zapletie do ľudských starostí tesne pred Vianocami.',
  'angel-lord-2': 'Petronel s Uriášom sa vracajú na zem, kde musia ochrániť mladú Magdalénu. Do príbehu vstúpi aj čertovský plán a poriadna dávka sviatočného chaosu.',
  'three-veterans': 'Traja vyslúžilci dostanú čarovné dary, ale prídu o ne pre chamtivosť a podvod. Cesta za ich vrátením je plná humoru, dobrodružstva a múdrych ponaučení.',
  'immortal-aunt': 'Dedinský chasník Matej získa vďaka Rozumu nečakanú múdrosť a uchádza sa o princeznú Pavlínku. Ich cestu komplikuje Závisť, ktorá ovládne takmer celý zámok.',
  'devil-knows-why': 'V kráľovstve Dobromila vládne bieda a moc preberajú chamtiví ľudia aj peklo. Bylinkárka Apolena verí v záchrancu, ktorý má pomôcť princeznej Aničke a krajine.',
  'lotrando-zubejda': 'Syn slávneho lotra Lotrando vyrastie v kláštore a musí sa vydať do sveta. Stretnutie so Zubejdou zmení jeho predstavu o tom, čo je správny život.',
  'cisars-baker-bakers-emperor': 'Cisár Rudolf II. túži po elixíre života a Golemovi, zatiaľ čo pekár Matej sa nečakane dostane k moci. Dvojdielna komédia si robí žarty z panovníkov aj alchýmie.',
  'madly-sad-princess': 'Dve znepriatelené kráľovstvá bránia láske svojich mladých vládcov. Princovia a princezná preto vymyslia plán, ako zastaviť vojnu aj svojich tvrdohlavých otcov.',
  'devils-not-jokes': 'Vyslúžilý vojak Martin Kabát sa vydá do pekla zachrániť princeznú a jej slúžku. Čerti, lúpežník aj ľudská odvaha sa stretnú v jednej z najobľúbenejších rozprávok.',
  'rysava-jalovica': 'Adam Krt kúpi na jarmoku jalovičku, no tá spred krčmy záhadne zmizne. Dedinské hádky sa napokon na Štedrý večer zmenia na zmierenie.',
  'love-actually': 'Viacero londýnskych príbehov sa prepletá počas adventu. Láska, rozchody, rodina aj nové začiatky ukazujú sviatky z rôznych uhlov.',
  'the-holiday': 'Dve ženy si cez Vianoce vymenia domovy, aby unikli sklamaniu. V novom prostredí ich čakajú nečakané priateľstvá, láska a nový pohľad na vlastný život.',
  'muppet-carol': 'Muppetovská verzia Dickensovej koledy necháva rozprávača Kermita sprevádzať príbeh Scroogea. Je veselá, hudobná a prekvapivo hrejivá.',
  'family-stone': 'Rodina Stoneovcov sa stretne počas Vianoc a pod povrchom sviatočnej pohody sa otvoria staré napätia, nové vzťahy aj otázky prijatia.',
  gremlins: 'Billy dostane na Vianoce zvláštneho tvora s tromi pravidlami. Keď ich poruší, malé monštrá premenia pokojné mestečko na poriadne divokú noc.',
  'last-christmas': 'Kate pracuje v londýnskom vianočnom obchode a žije trochu mimo vlastného života. Stretnutie s Tomom ju prinúti znovu si všímať ľudí okolo seba.',
  holdovers: 'Mrzutý učiteľ zostane cez prázdniny na internáte s problémovým študentom. Spolu s kuchárkou vytvoria nečakanú malú rodinu uprostred zimy.',
  'boy-called-christmas': 'Nikolas sa vydá na sever hľadať svojho otca a objaví krajinu plnú škriatkov, kúziel a nebezpečenstva. Z obyčajného chlapca sa rodí legenda.',
  'man-who-invented-christmas': 'Charles Dickens hľadá príbeh, ktorý by znovu naštartoval jeho kariéru. Z postáv okolo seba a vlastnej predstavivosti vytvorí Vianočnú koledu.',
  'family-man': 'Úspešný Jack dostane možnosť vidieť alternatívny život, v ktorom zostal so svojou bývalou láskou. Vianoce mu ukážu cenu rodiny, ktorú kedysi odložil.',
  'last-holiday': 'Skromná Georgia sa po zlej diagnóze rozhodne splniť si všetky sny. Zimná cesta do luxusného hotela jej prinesie nové sebavedomie aj priateľstvá.',
  'christmas-kranks': 'Krankovci chcú Vianoce preskočiť a odísť na plavbu. Keď sa ich dcéra nečakane vracia domov, susedská panika rozbehne sviatočný kolotoč.',
};

const WEIGHTS = { S: 5, A: 4, B: 3, C: 2, D: 1 };
const NAME_STORAGE_KEY = 'vianocny-tier-list.name';
const VOTED_STORAGE_KEY = 'vianocny-tier-list.voted-categories';
const TOUR_STORAGE_KEY = 'vianocny-tier-list.tour-seen';
const TRIVIA_INITIAL_DELAY = 150000;
const filmById = Object.fromEntries(FILMS.map((film) => [film.id, film]));
const rankingsByCategory = Object.fromEntries(CATEGORIES.map((category) => [category.id, {}]));
const filmCardCache = new Map();

let activeCategoryId = CATEGORIES[0].id;
let selectedFilmId = null;
let results = {};
let categoryCounts = Object.fromEntries(CATEGORIES.map((category) => [category.id, 0]));
let totalSubmissions = 0;
let boardNotice = '';
let viewMode = 'overview';
let detailScrollPosition = 0;
let detailTrigger = null;
let triviaQueue = [];
let triviaTimer = null;
let triviaDismissTimer = null;
let tourStep = 0;
let tourTarget = null;

const els = {
  overviewView: document.querySelector('#overviewView'),
  builderView: document.querySelector('#builderView'),
  overviewNav: document.querySelector('#overviewNav'),
  builderNav: document.querySelector('#builderNav'),
  tabs: document.querySelector('#categoryTabs'),
  heroStats: document.querySelector('#heroStats'),
  preview: document.querySelector('#previewGrid'),
  library: document.querySelector('#filmLibrary'),
  emptyLibrary: document.querySelector('#emptyLibrary'),
  search: document.querySelector('#searchInput'),
  hint: document.querySelector('#selectionHint'),
  title: document.querySelector('#activeCategoryTitle'),
  dialog: document.querySelector('#nameDialog'),
  form: document.querySelector('#nameForm'),
  name: document.querySelector('#nameInput'),
  dialogStatus: document.querySelector('#dialogStatus'),
  celebration: document.querySelector('#celebration'),
  celebrationText: document.querySelector('#celebrationText'),
  filmDialog: document.querySelector('#filmDialog'),
  filmDetail: document.querySelector('#filmDetail'),
  voteTotal: document.querySelector('#voteTotal'),
  submit: document.querySelector('#submitButton'),
  triviaToast: document.querySelector('#triviaToast'),
  triviaFilm: document.querySelector('#triviaFilm'),
  triviaText: document.querySelector('#triviaText'),
  triviaSource: document.querySelector('#triviaSource'),
  triviaClose: document.querySelector('#triviaClose'),
  tourLayer: document.querySelector('#tourLayer'),
  tourHole: document.querySelector('#tourHole'),
  tourProgress: document.querySelector('#tourProgress'),
  tourTitle: document.querySelector('#tourTitle'),
  tourText: document.querySelector('#tourText'),
  tourNext: document.querySelector('#tourNext'),
  tourSkip: document.querySelector('#tourSkip'),
};

function filmsInCategory(categoryId) { return FILMS.filter((film) => film.category === categoryId); }
function rankings() { return rankingsByCategory[activeCategoryId]; }
function setDialogLock(locked) {
  document.documentElement.classList.toggle('dialog-open', locked);
  document.body.classList.toggle('dialog-open', locked);
}
function shuffle(items) { return [...items].sort(() => Math.random() - 0.5); }
function scheduleTrivia(delay = 180000 + Math.random() * 120000) {
  window.clearTimeout(triviaTimer);
  triviaTimer = window.setTimeout(showTriviaFact, delay);
}
function dismissTrivia(scheduleNext = true) {
  if (!els.triviaToast || els.triviaToast.hidden) return;
  window.clearTimeout(triviaDismissTimer);
  els.triviaToast.classList.remove('is-visible');
  window.setTimeout(() => { els.triviaToast.hidden = true; }, 240);
  if (scheduleNext) scheduleTrivia();
}
function showTriviaFact() {
  if (!els.triviaToast || document.hidden || document.documentElement.classList.contains('dialog-open')) {
    scheduleTrivia(60000);
    return;
  }
  if (!triviaQueue.length) triviaQueue = shuffle(TRIVIA_FACTS);
  const fact = triviaQueue.pop();
  const film = filmById[fact.filmId];
  if (!film) { scheduleTrivia(60000); return; }
  els.triviaFilm.textContent = film.title;
  els.triviaText.textContent = fact.fact;
  els.triviaSource.href = fact.source;
  els.triviaToast.hidden = false;
  requestAnimationFrame(() => els.triviaToast.classList.add('is-visible'));
  triviaDismissTimer = window.setTimeout(() => dismissTrivia(), 22000);
}
function tourSteps() {
  const mobile = isTouchLayout();
  return [
    { selector: '.category-tabs', title: 'Vyber kategóriu', text: 'Začni kategóriou, ktorú chceš zoradiť. Každá má vlastný zoznam titulov.' },
    { selector: '.library-panel', title: 'Vyber titul', text: mobile ? 'Na mobile ťukni na plagát, ktorý chceš zaradiť.' : 'Na počítači chyť plagát a potiahni ho do vybraného tieru.' },
    { selector: '.tier-panel', title: 'Priraď mu tier', text: mobile ? 'Potom ťukni na S až D. Titul sa presunie a môžeš pokračovať ďalším.' : 'Potiahni plagát do S až D. S je povinná vianočná jazda, D je titul, ktorý nechceš znova vidieť.' },
    { selector: '.submit-row', title: 'Ulož svoj výber', text: 'Keď má každý titul svoje miesto, klikni na uloženie. Stačí už len tvoje meno alebo prezývka.' },
  ];
}
function markTourSeen() {
  try { localStorage.setItem(TOUR_STORAGE_KEY, '1'); } catch { /* Storage may be unavailable. */ }
}
function positionTourTarget() {
  if (!tourTarget || els.tourLayer.hidden) return;
  const rect = tourTarget.getBoundingClientRect();
  const pad = 7;
  els.tourHole.style.left = `${Math.max(8, rect.left - pad)}px`;
  els.tourHole.style.top = `${Math.max(8, rect.top - pad)}px`;
  els.tourHole.style.width = `${Math.min(window.innerWidth - 16, rect.width + pad * 2)}px`;
  els.tourHole.style.height = `${Math.min(window.innerHeight - 16, rect.height + pad * 2)}px`;
}
function closeTour() {
  markTourSeen();
  els.tourLayer.classList.remove('is-visible');
  window.removeEventListener('resize', positionTourTarget);
  window.removeEventListener('scroll', positionTourTarget, true);
  window.setTimeout(() => { els.tourLayer.hidden = true; }, 220);
}
function renderTourStep() {
  const steps = tourSteps();
  const step = steps[tourStep];
  if (!step) { closeTour(); return; }
  tourTarget = document.querySelector(step.selector);
  if (!tourTarget) { closeTour(); return; }
  els.tourProgress.textContent = `${tourStep + 1} / ${steps.length}`;
  els.tourTitle.textContent = step.title;
  els.tourText.textContent = step.text;
  els.tourNext.textContent = tourStep === steps.length - 1 ? 'Začať tierovať' : 'Rozumiem';
  tourTarget.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
  window.setTimeout(positionTourTarget, 240);
}
function openTour() {
  let hasSeen = false;
  try { hasSeen = localStorage.getItem(TOUR_STORAGE_KEY) === '1'; } catch { /* Storage may be unavailable. */ }
  if (hasSeen) return;
  goToBuilder(CATEGORIES[0].id);
  tourStep = 0;
  els.tourLayer.hidden = false;
  window.addEventListener('resize', positionTourTarget);
  window.addEventListener('scroll', positionTourTarget, true);
  requestAnimationFrame(() => {
    els.tourLayer.classList.add('is-visible');
    renderTourStep();
  });
}
function categoryLabel(categoryId) { return CATEGORIES.find((category) => category.id === categoryId)?.label || categoryId; }
function categoryDisplayMarkup(category) {
  if (category.id === 'animaky') return 'Animá<span class="category-drop-letter">k</span>y';
  return category.label;
}
function categoryCountLabel(categoryId) {
  const count = categoryCounts[categoryId] || 0;
  return `${count} ${count === 1 ? 'človek' : 'ľudí'}`;
}
function categoryVoteLabel(categoryId) {
  const count = categoryCounts[categoryId] || 0;
  return count === 1 ? '1 človek hodnotil' : `${count} ľudí hodnotilo`;
}
function votedCategories() {
  try { return new Set(JSON.parse(localStorage.getItem(VOTED_STORAGE_KEY) || '[]')); } catch { return new Set(); }
}
function saveVotedCategory(categoryId) {
  const voted = votedCategories();
  voted.add(categoryId);
  try { localStorage.setItem(VOTED_STORAGE_KEY, JSON.stringify([...voted])); } catch { /* Storage may be unavailable. */ }
}
function hasVotedCategory(categoryId) { return votedCategories().has(categoryId); }
function nextUnvotedCategoryId(currentCategoryId) {
  const voted = votedCategories();
  return CATEGORIES.find((category) => category.id !== currentCategoryId && !voted.has(category.id))?.id || null;
}
function filmIntro(film) {
  return FILM_DETAILS[film.id] || `Krátka vianočná filmová zastávka z roku ${film.year}.`;
}

function openFilmDetail(film, trigger = null) {
  detailScrollPosition = window.scrollY;
  detailTrigger = trigger;
  els.filmDetail.innerHTML = `<div class="film-detail">
    <div class="film-detail-poster"><img src="${film.image}" alt="${film.title} — náhľad" /></div>
    <div class="film-detail-copy">
      <span class="section-label">${categoryLabel(film.category)} · ${film.year}</span>
      <h2>${film.title}</h2>
      <p>${filmIntro(film)}</p>
    </div>
  </div>`;
  setDialogLock(true);
  els.filmDialog.showModal();
  requestAnimationFrame(() => window.scrollTo(0, detailScrollPosition));
}

function initSnowfall() {
  const canvas = document.querySelector('#snowCanvas');
  if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const context = canvas.getContext('2d');
  if (!context) return;
  let width = 0;
  let height = 0;
  let ratio = 1;
  let flakes = [];
  let gusts = [];
  let nextGustAt = 0;
  const randomFlake = (startAtTop = false) => ({
    x: Math.random() * width,
    y: startAtTop ? -Math.random() * height : Math.random() * height,
    depth: .16 + Math.random() * .84,
    radius: .32 + Math.random() * 1.45,
    fallSpeed: 72 + Math.random() * 78,
    verticalSpeed: 84 + Math.random() * 34,
    horizontalSpeed: (Math.random() - .5) * 22,
    windResponse: .72 + Math.random() * 1.2,
    sway: .3 + Math.random() * 1.4,
    phase: Math.random() * Math.PI * 2,
    opacity: .1 + Math.random() * .46,
    soft: Math.random() < .22,
  });
  const spawnGust = (time) => {
    const blizzard = Math.random() < .14;
    const direction = Math.random() > .5 ? 1 : -1;
    const duration = blizzard ? 1.5 + Math.random() * 1.7 : .75 + Math.random() * 1.2;
    const gust = {
      x: direction > 0 ? -width * .22 : width * 1.22,
      y: Math.random() * height,
      radiusX: blizzard ? width * .82 : 110 + Math.random() * 230,
      radiusY: blizzard ? height * .52 : 90 + Math.random() * 190,
      direction,
      strength: (blizzard ? 85 : 38 + Math.random() * 70) * direction,
      swirl: (blizzard ? 12 : 8 + Math.random() * 18) * (Math.random() > .5 ? 1 : -1),
      travel: blizzard ? 12 + Math.random() * 22 : 28 + Math.random() * 55,
      verticalTravel: (Math.random() - .5) * 18,
      age: 0,
      duration,
      born: time,
    };
    gusts.push(gust);
    nextGustAt = time + (blizzard ? 5200 : 1700 + Math.random() * 3900);
  };
  const resize = () => {
    ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.min(420, Math.max(160, Math.round(width / 4.5)));
    flakes = Array.from({ length: count }, () => randomFlake());
  };
  let previousTime = 0;
  const draw = (time) => {
    const elapsed = Math.min(50, time - previousTime || 16) / 1000;
    previousTime = time;
    context.clearRect(0, 0, width, height);
    if (time > nextGustAt) spawnGust(time);
    gusts.forEach((gust) => {
      gust.age += elapsed;
      gust.x += gust.direction * gust.travel * elapsed;
      gust.y += gust.verticalTravel * elapsed;
    });
    gusts = gusts.filter((gust) => gust.age < gust.duration);
    flakes.forEach((flake) => {
      let horizontalForce = Math.sin(time * .00019 + flake.phase) * 8 + Math.sin(time * .00047 * flake.sway + flake.phase * 1.7) * 4;
      let verticalForce = Math.sin(time * .00033 + flake.phase) * 2;
      gusts.forEach((gust) => {
        const offsetX = (flake.x - gust.x) / gust.radiusX;
        const offsetY = (flake.y - gust.y) / gust.radiusY;
        const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
        if (distance >= 1) return;
        const influence = (1 - distance) ** 2;
        const pulse = Math.sin(Math.min(1, gust.age / gust.duration) * Math.PI);
        horizontalForce += gust.strength * pulse * influence;
        horizontalForce += -offsetY * gust.swirl * pulse * influence;
        verticalForce += offsetX * gust.swirl * .48 * pulse * influence;
      });
      const targetHorizontalSpeed = horizontalForce * flake.windResponse * (.72 + flake.depth * .42);
      const targetVerticalSpeed = Math.max(10, flake.fallSpeed + verticalForce);
      const inertia = Math.min(1, elapsed * 2.1);
      flake.horizontalSpeed += (targetHorizontalSpeed - flake.horizontalSpeed) * inertia;
      flake.verticalSpeed += (targetVerticalSpeed - flake.verticalSpeed) * Math.min(1, elapsed * 1.45);
      flake.x += flake.horizontalSpeed * elapsed;
      flake.y += flake.verticalSpeed * elapsed;
      if (flake.y > height + 8 || flake.x < -12 || flake.x > width + 12) Object.assign(flake, randomFlake(true));
      context.beginPath();
      context.globalAlpha = flake.opacity;
      context.fillStyle = '#f7f1e7';
      if (flake.soft) {
        context.shadowBlur = 5 + flake.depth * 3;
        context.shadowColor = 'rgba(247,241,231,.45)';
      }
      context.ellipse(flake.x, flake.y, flake.radius, flake.radius * (.72 + flake.depth * .24), flake.horizontalSpeed * .018, 0, Math.PI * 2);
      context.fill();
      context.shadowBlur = 0;
    });
    context.globalAlpha = 1;
    requestAnimationFrame(draw);
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });
  requestAnimationFrame(draw);
}

function renderTabs() {
  els.tabs.innerHTML = CATEGORIES.map((category) => `<button class="category-tab category-tab--${category.id} ${category.id === activeCategoryId ? 'is-active' : ''} ${hasVotedCategory(category.id) ? 'is-voted' : ''}" type="button" data-category="${category.id}" aria-label="${category.label}${hasVotedCategory(category.id) ? ', už odhlasované' : ''}"><strong><span class="category-name category-name--${category.id}">${categoryDisplayMarkup(category)}</span><span class="category-check" aria-hidden="true">${hasVotedCategory(category.id) ? '✓' : ''}</span></strong><small>${categoryCountLabel(category.id)}</small></button>`).join('');
  els.tabs.querySelectorAll('.category-tab').forEach((tab) => tab.addEventListener('click', () => switchCategory(tab.dataset.category)));
}

function isTouchLayout() { return window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 600; }

function createFilmCard(film) {
  const card = document.createElement('article');
  card.className = 'film-card';
  card.draggable = !isTouchLayout();
  card.dataset.filmId = film.id;
  card.title = film.title;
  card.innerHTML = `<button class="film-card-main" type="button" aria-label="${film.title}, ${film.year}"><img loading="eager" decoding="async" src="${film.image}" alt="${film.title} — náhľad" /><span class="card-meta"><strong>${film.title}</strong><small>${film.year}</small></span></button><button class="film-info-button" type="button" aria-label="O filme ${film.title}">i</button>`;
  card.addEventListener('dragstart', (event) => { event.dataTransfer.setData('text/plain', film.id); card.classList.add('is-selected'); });
  card.addEventListener('dragend', () => card.classList.remove('is-selected'));
  card.querySelector('.film-card-main').addEventListener('click', () => {
    boardNotice = '';
    if (rankings()[film.id]) rankings()[film.id] = null;
    else selectedFilmId = selectedFilmId === film.id ? null : film.id;
    renderBoard();
  });
  card.querySelector('.film-info-button').addEventListener('click', (event) => { event.stopPropagation(); openFilmDetail(film, event.currentTarget); });
  return card;
}

function getFilmCard(film) {
  if (!filmCardCache.has(film.id)) filmCardCache.set(film.id, createFilmCard(film));
  return filmCardCache.get(film.id);
}

function moveFilm(filmId, tier) {
  if (!filmById[filmId] || filmById[filmId].category !== activeCategoryId) return;
  boardNotice = '';
  rankings()[filmId] = tier;
  selectedFilmId = null;
  renderBoard();
}

function renderBoard() {
  const categoryFilms = filmsInCategory(activeCategoryId);
  const query = els.search.value.trim().toLowerCase();
  els.title.className = `category-title category-title--${activeCategoryId}`;
  els.title.innerHTML = categoryDisplayMarkup(CATEGORIES.find((category) => category.id === activeCategoryId));
  els.library.innerHTML = '';
  const unranked = categoryFilms.filter((film) => !rankings()[film.id] && film.title.toLowerCase().includes(query));
  els.emptyLibrary.hidden = unranked.length > 0;
  unranked.forEach((film) => els.library.appendChild(getFilmCard(film)));

  document.querySelectorAll('.tier-dropzone').forEach((zone) => {
    zone.innerHTML = '';
    const tierFilms = categoryFilms.filter((film) => rankings()[film.id] === zone.dataset.tier);
    tierFilms.forEach((film) => zone.appendChild(getFilmCard(film)));
  });

  document.querySelectorAll('.film-card').forEach((card) => {
    card.draggable = !isTouchLayout();
    card.classList.toggle('is-selected', card.dataset.filmId === selectedFilmId);
  });
  const remaining = categoryFilms.filter((film) => !rankings()[film.id]).length;
  const ranked = categoryFilms.length - remaining;
  const categoryIsVoted = hasVotedCategory(activeCategoryId);
  els.hint.textContent = boardNotice || (categoryIsVoted ? 'V tejto kategórii už máš hlas uložený' : selectedFilmId ? 'Vyber tier S–D' : `${ranked} z ${categoryFilms.length} zoradených`);
  els.hint.classList.toggle('is-active', Boolean(selectedFilmId || boardNotice));
  els.submit.disabled = remaining > 0 || categoryIsVoted;
  els.submit.textContent = categoryIsVoted ? 'Hlas už odoslaný' : 'Uložiť tierlist';
}

function aggregateForFilm(filmId) {
  const votes = results[filmId] || {};
  const total = Object.values(votes).reduce((sum, value) => sum + Number(value || 0), 0);
  const points = Object.entries(votes).reduce((sum, [tier, count]) => sum + (WEIGHTS[tier] || 0) * Number(count || 0), 0);
  return { votes, total, score: total ? points / total : null };
}

function previewFilms(categoryId, limit = 3) {
  return filmsInCategory(categoryId).map((film, index) => ({ film, ...aggregateForFilm(film.id), index })).sort((a, b) => {
    if (a.score === null && b.score === null) return a.index - b.index;
    if (a.score === null) return 1;
    if (b.score === null) return -1;
    return b.score - a.score || b.total - a.total || a.index - b.index;
  }).slice(0, limit);
}

function renderHeroStats() {
  const leaders = FILMS.map((film, index) => ({ film, ...aggregateForFilm(film.id), index })).filter((item) => item.score !== null).sort((a, b) => b.score - a.score || b.total - a.total || a.index - b.index);
  const leader = leaders[0];
  const busiest = CATEGORIES.map((category) => ({ category, count: categoryCounts[category.id] || 0 })).sort((a, b) => b.count - a.count)[0];
  const completed = CATEGORIES.filter((category) => hasVotedCategory(category.id)).length;
  const hasAnyData = Boolean(leader || busiest.count || totalSubmissions || completed);
  els.heroStats.innerHTML = `
    <article class="hero-stat hero-stat-leader"><span class="hero-stat-kicker">Zatiaľ jednoznačne vyhráva</span><strong>${hasAnyData && leader ? leader.film.title : '-'}</strong><small>${hasAnyData && leader ? `${leader.score.toFixed(1)} bodu · ${leader.total} ${leader.total === 1 ? 'hlas' : 'hlasov'}` : '-'}</small></article>
    <article class="hero-stat"><span class="hero-stat-kicker">Najviac pozornosti zbiera</span><strong>${hasAnyData && busiest.count ? categoryDisplayMarkup(busiest.category) : '-'}</strong><small>${hasAnyData && busiest.count ? `${busiest.count} ${busiest.count === 1 ? 'človek už zoradil' : 'ľudia už zoradili'}` : '-'}</small></article>
    <article class="hero-stat"><span class="hero-stat-kicker">Tvoj sviatočný progress</span><strong>${hasAnyData ? `${completed}/${CATEGORIES.length} kategórií` : '-'}</strong><small>${hasAnyData && totalSubmissions ? `${totalSubmissions} ${totalSubmissions === 1 ? 'hlas je' : 'hlasov je'} v hre` : '-'}</small></article>`;
}

function renderPreview() {
  renderHeroStats();
  els.voteTotal.textContent = `${totalSubmissions} ${totalSubmissions === 1 ? 'hodnotenie' : 'hodnotení'} celkom`;
  els.preview.innerHTML = CATEGORIES.map((category) => `<article class="preview-card preview-card--${category.id}">
    <div class="preview-card-head"><div><h3 class="category-title category-title--${category.id}">${categoryDisplayMarkup(category)}</h3><small class="category-votes">${categoryVoteLabel(category.id)}</small></div><button class="jump-button" type="button" data-jump="${category.id}">Zoraď</button></div>
    ${[previewFilms(category.id, 3), previewFilms(category.id, 6).slice(3)].map((items, rowIndex) => items.length ? `<div class="top-three ${rowIndex ? 'top-three--more' : ''}">${items.map((item, index) => `<button class="top-three-row" type="button" data-jump="${category.id}"><span class="place">${rowIndex ? index + 4 : index + 1}</span><img data-film-id="${item.film.id}" src="${item.film.image}" alt="${item.film.title} — náhľad" /><span class="top-three-title"><strong>${item.film.title}</strong><small>${item.film.year}</small></span><span class="top-three-score">${item.score === null ? '—' : item.score.toFixed(1)}</span></button>`).join('')}</div>` : '').join('')}
  </article>`).join('');
  els.preview.querySelectorAll('[data-jump]').forEach((button) => button.addEventListener('click', () => goToBuilder(button.dataset.jump)));
}

function setViewMode(nextView) {
  viewMode = nextView;
  els.overviewView.hidden = nextView !== 'overview';
  els.builderView.hidden = nextView !== 'builder';
  els.overviewNav.classList.toggle('is-active', nextView === 'overview');
  els.builderNav.classList.toggle('is-active', nextView === 'builder');
  els.overviewNav.setAttribute('aria-current', nextView === 'overview' ? 'page' : 'false');
  els.builderNav.setAttribute('aria-current', nextView === 'builder' ? 'page' : 'false');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToBuilder(categoryId = activeCategoryId) {
  if (categoryId && rankingsByCategory[categoryId]) activeCategoryId = categoryId;
  selectedFilmId = null;
  boardNotice = '';
  els.search.value = '';
  renderTabs();
  renderBoard();
  setViewMode('builder');
}

function switchCategory(categoryId) {
  if (!rankingsByCategory[categoryId]) return;
  activeCategoryId = categoryId;
  selectedFilmId = null;
  boardNotice = '';
  els.search.value = '';
  renderTabs();
  renderBoard();
}

async function loadResults() {
  try {
    const response = await fetch('/api/votes', { headers: { accept: 'application/json' } });
    if (!response.ok) return;
    const payload = await response.json();
    results = payload.results || {};
    categoryCounts = { ...categoryCounts, ...(payload.categoryCounts || {}) };
    totalSubmissions = Number(payload.submissions || 0);
    renderTabs();
    renderPreview();
  } catch { /* Preview can still be used without the API. */ }
}

els.search.addEventListener('input', renderBoard);
document.querySelectorAll('.tier-dropzone').forEach((zone) => {
  zone.addEventListener('dragover', (event) => { event.preventDefault(); zone.classList.add('is-over'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('is-over'));
  zone.addEventListener('drop', (event) => { event.preventDefault(); zone.classList.remove('is-over'); moveFilm(event.dataTransfer.getData('text/plain'), zone.dataset.tier); });
  zone.addEventListener('click', () => { if (selectedFilmId) moveFilm(selectedFilmId, zone.dataset.tier); });
});

els.overviewNav.addEventListener('click', () => setViewMode('overview'));
els.builderNav.addEventListener('click', () => goToBuilder());
document.querySelector('#resetBoard').addEventListener('click', () => { rankingsByCategory[activeCategoryId] = {}; selectedFilmId = null; boardNotice = ''; renderBoard(); });
document.querySelector('#submitButton').addEventListener('click', () => {
  if (hasVotedCategory(activeCategoryId)) return;
  els.dialogStatus.textContent = '';
  try { els.name.value = localStorage.getItem(NAME_STORAGE_KEY) || ''; } catch { els.name.value = ''; }
  setDialogLock(true);
  els.dialog.showModal();
  window.setTimeout(() => els.name.focus(), 50);
});

els.form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (hasVotedCategory(activeCategoryId)) {
    els.dialogStatus.textContent = 'V tejto kategórii už máš hlas uložený.';
    return;
  }
  const name = els.name.value.trim();
  if (!name) return;
  const submit = els.form.querySelector('.dialog-submit');
  submit.disabled = true;
  submit.textContent = 'Odosielam…';
  try {
    const response = await fetch('/api/votes', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name, categoryId: activeCategoryId, rankings: rankings() }) });
    if (!response.ok) throw new Error('offline');
    const data = await response.json();
    results = data.results || results;
    categoryCounts = { ...categoryCounts, ...(data.categoryCounts || {}) };
    totalSubmissions = Number(data.submissions || totalSubmissions);
    try { localStorage.setItem(NAME_STORAGE_KEY, name); } catch { /* Storage may be unavailable. */ }
    saveVotedCategory(activeCategoryId);
    els.dialog.close();
    const submittedCategoryId = activeCategoryId;
    const nextCategoryId = nextUnvotedCategoryId(submittedCategoryId);
    renderTabs();
    renderPreview();
    els.celebrationText.textContent = nextCategoryId ? `Ďalej: ${categoryLabel(nextCategoryId)}` : 'Všetky kategórie sú hotové';
    els.celebration.hidden = false;
    requestAnimationFrame(() => els.celebration.classList.add('is-visible'));
    window.setTimeout(() => {
      els.celebration.classList.remove('is-visible');
      window.setTimeout(() => {
        els.celebration.hidden = true;
        if (nextCategoryId) {
          goToBuilder(nextCategoryId);
        } else {
          setViewMode('overview');
        }
      }, 220);
    }, 950);
  } catch {
    els.dialogStatus.textContent = 'Nepodarilo sa uložiť. Skús znova.';
  } finally {
    submit.disabled = false;
    submit.textContent = 'Odoslať';
  }
});

document.querySelector('.dialog-close').addEventListener('click', () => els.dialog.close());
els.dialog.addEventListener('close', () => setDialogLock(false));
els.filmDialog.addEventListener('close', () => {
  setDialogLock(false);
  window.scrollTo(0, detailScrollPosition);
  if (detailTrigger) detailTrigger.focus({ preventScroll: true });
  detailTrigger = null;
});
els.triviaClose.addEventListener('click', () => dismissTrivia());
els.tourNext.addEventListener('click', () => {
  tourStep += 1;
  renderTourStep();
});
els.tourSkip.addEventListener('click', closeTour);
renderTabs();
renderBoard();
renderPreview();
setViewMode('overview');
initSnowfall();
loadResults();
scheduleTrivia(TRIVIA_INITIAL_DELAY);
window.setTimeout(openTour, 520);

