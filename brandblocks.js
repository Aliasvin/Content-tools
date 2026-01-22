/* ============================================================
   MERK CATEGORIEBLOKKEN – generator
   Kies merk + (1 of meerdere) IDs + afbeelding URL → JS object regels
   ============================================================ */

/**
 * Data: merk → ids[]
 * Bron: Merken categorieblokken.xlsx (sheet: Merken)
 * ids zijn strings (zoals in jouw voorbeeld)
 */
const BRAND_CATEGORIEBLOKKEN = [{"name": "3M", "ids": ["337"]}, {"name": "4K5", "ids": ["543"]}, {"name": "ABLOY", "ids": ["537"]}, {"name": "Abus", "ids": ["199"]}, {"name": "ADA Instruments", "ids": ["208"]}, {"name": "Admiral", "ids": ["450"]}, {"name": "AEG", "ids": ["394"]}, {"name": "AEG Powertools", "ids": ["22"]}, {"name": "Aerotec", "ids": ["451"]}, {"name": "AGP", "ids": ["311"]}, {"name": "Airmec", "ids": ["133"]}, {"name": "Airpress", "ids": ["271"]}, {"name": "Alabastine", "ids": ["293"]}, {"name": "Alecto", "ids": ["579"]}, {"name": "Allux", "ids": ["530"]}, {"name": "Allway", "ids": ["512"]}, {"name": "Alpen Boren", "ids": ["23"]}, {"name": "Alpha", "ids": ["458"]}, {"name": "Altrex", "ids": ["194"]}, {"name": "Alu-Top", "ids": ["196"]}, {"name": "Alutec", "ids": ["476"]}, {"name": "AMI", "ids": ["613"]}, {"name": "Ampri", "ids": ["335"]}, {"name": "AmPro", "ids": ["153"]}, {"name": "Anker", "ids": ["487"]}, {"name": "Ansell", "ids": ["336"]}, {"name": "Ansmann", "ids": ["449"]}, {"name": "Artemide", "ids": ["229"]}, {"name": "Asatex", "ids": ["338"]}, {"name": "ASC", "ids": ["207"]}, {"name": "Aspen", "ids": ["282"]}, {"name": "ASSA ABLOY", "ids": ["536"]}, {"name": "Aten", "ids": ["395"]}, {"name": "Athlet", "ids": ["459"]}, {"name": "Atlas", "ids": ["593"]}, {"name": "Attema", "ids": ["606"]}, {"name": "AXA", "ids": ["616"]}, {"name": "Baak", "ids": ["586"]}, {"name": "Bahco", "ids": ["24"]}, {"name": "Baier", "ids": ["206"]}, {"name": "Bandridge", "ids": ["396"]}, {"name": "Base Protection", "ids": ["307"]}, {"name": "Bata", "ids": ["595"]}, {"name": "Batavia", "ids": ["131"]}, {"name": "Bekina", "ids": ["262"]}, {"name": "Bemko", "ids": ["167"]}, {"name": "Benning", "ids": ["25"]}, {"name": "Berg", "ids": ["26"]}, {"name": "Berker", "ids": ["607"]}, {"name": "Bernardo", "ids": ["269"]}, {"name": "Bessey", "ids": ["27"]}, {"name": "Beta", "ids": ["139"]}, {"name": "Bevo", "ids": ["452"]}, {"name": "Big-Wipes", "ids": ["513"]}, {"name": "Bimos", "ids": ["339"]}, {"name": "Birkenstock", "ids": ["340"]}, {"name": "Bison", "ids": ["292"]}, {"name": "Black+Decker", "ids": ["28"]}, {"name": "Blackline", "ids": ["558"]}, {"name": "Blackstone", "ids": ["594"]}, {"name": "Blåkläder", "ids": ["591"]}, {"name": "BMC", "ids": ["168"]}, {"name": "BMI", "ids": ["341"]}, {"name": "Bosch Accessoires", "ids": ["29"]}, {"name": "Bosch Blauw", "ids": ["30"]}, {"name": "Bosch Groen", "ids": ["31"]}, {"name": "Bostik", "ids": ["608"]}, {"name": "Bostitch", "ids": ["32"]}, {"name": "Bott", "ids": ["342"]}, {"name": "Brennenstuhl", "ids": ["33"]}, {"name": "Brennenstuhl ProfessionalLINE", "ids": ["306"]}, {"name": "Brick", "ids": ["495"]}, {"name": "Briggs en Stratton", "ids": ["34"]}, {"name": "Brilliant", "ids": ["169"]}, {"name": "Briton", "ids": ["618"]}, {"name": "Brüder Mannesmann", "ids": ["522"]}, {"name": "BS Rollen", "ids": ["343"]}, {"name": "BS Systems", "ids": ["344"]}, {"name": "Buckbootz", "ids": ["596"]}, {"name": "Burg Wächter", "ids": ["200"]}, {"name": "Busch Jaeger", "ids": ["170"]}, {"name": "Calex", "ids": ["161"]}, {"name": "Camelion", "ids": ["242"]}, {"name": "Camlink", "ids": ["397"]}, {"name": "Carat", "ids": ["35"]}, {"name": "Carolus", "ids": ["237"]}, {"name": "CAT Lights", "ids": ["502"]}, {"name": "Caterpillar", "ids": ["308"]}, {"name": "Cellfast", "ids": ["243"]}, {"name": "Celo", "ids": ["345"]}, {"name": "Century", "ids": ["398"]}, {"name": "Cerva", "ids": ["590"]}, {"name": "Cetabever", "ids": ["619"]}, {"name": "Chemwik", "ids": ["399"]}, {"name": "Cimco", "ids": ["228"]}, {"name": "Cisa", "ids": ["617"]}, {"name": "City Pumps", "ids": ["467"]}, {"name": "CLC Work Gear", "ids": ["477"]}, {"name": "Cleancraft", "ids": ["346"]}, {"name": "Collomix", "ids": ["244"]}, {"name": "ColorWorks", "ids": ["547"]}, {"name": "Colorworks (niet actief)", "ids": ["548"]}, {"name": "CON:P", "ids": ["572"]}, {"name": "Connex", "ids": ["571"]}, {"name": "Constructor", "ids": ["497"]}, {"name": "Contimac", "ids": ["465"]}, {"name": "Cool Clima", "ids": ["507"]}, {"name": "Copenhagen Pro", "ids": ["529"]}, {"name": "Cornat", "ids": ["573"]}, {"name": "Creusen", "ids": ["36"]}, {"name": "Dak & Gevel", "ids": ["560"]}, {"name": "Dataflex", "ids": ["400"]}, {"name": "Dauphin", "ids": ["453"]}, {"name": "DecaLED", "ids": ["187"]}, {"name": "Delonghi", "ids": ["401"]}, {"name": "Delta", "ids": ["447"]}, {"name": "Den Braven", "ids": ["291"]}, {"name": "Denver Electronics", "ids": ["245"]}, {"name": "DeWalt", "ids": ["37"]}, {"name": "DeWalt Accessoires", "ids": ["322"]}, {"name": "DI-O", "ids": ["460"]}, {"name": "Diadora", "ids": ["597"]}, {"name": "Dickie Dyer", "ids": ["235"]}, {"name": "Diesel with Foscarini", "ids": ["231"]}, {"name": "Diggers", "ids": ["592"]}, {"name": "Dolezych", "ids": ["347"]}, {"name": "Dolmar", "ids": ["38"]}, {"name": "Dreher & Kauf", "ids": ["402"]}, {"name": "Dremel", "ids": ["39"]}, {"name": "Dremel Accessoires", "ids": ["40"]}, {"name": "Duck", "ids": ["609"]}, {"name": "Dunlop", "ids": ["261"]}, {"name": "Dura", "ids": ["171"]}, {"name": "Durable", "ids": ["348"]}, {"name": "Duracell", "ids": ["172"]}, {"name": "Dutack", "ids": ["41"]}, {"name": "Dynaplus", "ids": ["561"]}, {"name": "E-Z UP", "ids": ["553"]}, {"name": "E.G.O.", "ids": ["403"]}, {"name": "Edding", "ids": ["349"]}, {"name": "Edimax", "ids": ["404"]}, {"name": "Effeff", "ids": ["541"]}, {"name": "EGAMaster", "ids": ["246"]}, {"name": "Eglo", "ids": ["163"]}, {"name": "Einhell", "ids": ["474"]}, {"name": "EISL", "ids": ["470"]}, {"name": "Ekko pumps", "ids": ["496"]}, {"name": "EldoLED", "ids": ["193"]}, {"name": "Electrolux", "ids": ["405"]}, {"name": "Elem garden technic", "ids": ["490"]}, {"name": "Elem Technic", "ids": ["508"]}, {"name": "Ellen", "ids": ["624"]}, {"name": "Eminent", "ids": ["247"]}, {"name": "Emma", "ids": ["598"]}, {"name": "Energizer", "ids": ["406"]}, {"name": "ENT", "ids": ["325"]}, {"name": "Enzo", "ids": ["42"]}, {"name": "Erdi", "ids": ["350"]}, {"name": "Erro Storage", "ids": ["43"]}, {"name": "Ersa", "ids": ["351"]}, {"name": "EtiamPro", "ids": ["248"]}, {"name": "Euro Filter", "ids": ["407"]}, {"name": "Euro-Dan", "ids": ["260"]}, {"name": "Euroboor", "ids": ["44"]}, {"name": "Eurodan", "ids": ["332"]}, {"name": "Euroline", "ids": ["197"]}, {"name": "Eurom", "ids": ["45"]}, {"name": "Evolution", "ids": ["142"]}, {"name": "Expert by Facom", "ids": ["314"]}, {"name": "Explorer Cases", "ids": ["270"]}, {"name": "Expo Trading Holland", "ids": ["225"]}, {"name": "Eyckhaus", "ids": ["471"]}, {"name": "Facom", "ids": ["221"]}, {"name": "Fairybell", "ids": ["195"]}, {"name": "Fein", "ids": ["46"]}, {"name": "Felco", "ids": ["352"]}, {"name": "Felder", "ids": ["353"]}, {"name": "Femi", "ids": ["155"]}, {"name": "Fento", "ids": ["587"]}, {"name": "Festool", "ids": ["47"]}, {"name": "Festool Accessoires", "ids": ["48"]}, {"name": "Fiac", "ids": ["278"]}, {"name": "Fini", "ids": ["49"]}, {"name": "Fisch-Tools", "ids": ["354"]}, {"name": "Fischer", "ids": ["241"]}, {"name": "Fiskars", "ids": ["320"]}, {"name": "Fixapart", "ids": ["408"]}, {"name": "Fixman", "ids": ["149"]}, {"name": "Flex-tools", "ids": ["127"]}, {"name": "Flexovit", "ids": ["50"]}, {"name": "FLOS", "ids": ["230"]}, {"name": "Flymo", "ids": ["51"]}, {"name": "Friess", "ids": ["521"]}, {"name": "Futech", "ids": ["52"]}, {"name": "G21", "ids": ["222"]}, {"name": "Gallagher", "ids": ["472"]}, {"name": "Garden Lights", "ids": ["249"]}, {"name": "Gardena", "ids": ["53"]}, {"name": "Gardeo PRO", "ids": ["499"]}, {"name": "GB", "ids": ["568"]}, {"name": "Gedore", "ids": ["54"]}, {"name": "Genius", "ids": ["128"]}, {"name": "Gesipa", "ids": ["355"]}, {"name": "Ghibli & Wirbel", "ids": ["468"]}, {"name": "Gira", "ids": ["610"]}, {"name": "Glitsa", "ids": ["620"]}, {"name": "Globo", "ids": ["209"]}, {"name": "Gloria", "ids": ["454"]}, {"name": "GMC", "ids": ["150"]}, {"name": "Gopart", "ids": ["55"]}, {"name": "GP", "ids": ["173"]}, {"name": "Grabo", "ids": ["578"]}, {"name": "Graphite", "ids": ["233"]}, {"name": "Griffon", "ids": ["250"]}, {"name": "Grisport", "ids": ["240"]}, {"name": "Grisport Safety", "ids": ["259"]}, {"name": "GT-Line", "ids": ["56"]}, {"name": "GVS", "ids": ["515"]}, {"name": "Gys", "ids": ["57"]}, {"name": "Halder", "ids": ["356"]}, {"name": "Hamerite", "ids": ["621"]}, {"name": "Hardbrass", "ids": ["533"]}, {"name": "Haupa", "ids": ["144"]}, {"name": "Havep", "ids": ["58"]}, {"name": "Hazet", "ids": ["445"]}, {"name": "Heco", "ids": ["294"]}, {"name": "Helios Preisser", "ids": ["357"]}, {"name": "Helit", "ids": ["358"]}, {"name": "Heller", "ids": ["359"]}, {"name": "Hepco en Becker", "ids": ["59"]}, {"name": "Heuer", "ids": ["60"]}, {"name": "HG", "ids": ["542"]}, {"name": "Hikoki", "ids": ["281"]}, {"name": "Hikoki Accessoires", "ids": ["160"]}, {"name": "Hirschmann", "ids": ["442"]}, {"name": "Hitachi", "ids": ["61"]}, {"name": "Hitachi Accessoires", "ids": ["329"]}, {"name": "HKS", "ids": ["599"]}, {"name": "Hoenderdaal Fasteners", "ids": ["556"]}, {"name": "Homefix", "ids": ["557"]}, {"name": "Honeywell", "ids": ["361"]}, {"name": "Honeywell Howard Leight", "ids": ["362"]}, {"name": "Hope", "ids": ["174"]}, {"name": "Hozelock", "ids": ["62"]}, {"name": "HPX", "ids": ["469"]}, {"name": "HQ-Power", "ids": ["251"]}, {"name": "HSV", "ids": ["510"]}, {"name": "Hultafors", "ids": ["473"]}, {"name": "Huvema", "ids": ["63"]}, {"name": "HyCell", "ids": ["457"]}, {"name": "Hyundai", "ids": ["324"]}, {"name": "Hünersdorff", "ids": ["363"]}, {"name": "i-Tools", "ids": ["298"]}, {"name": "I-Watts", "ids": ["492"]}, {"name": "I-Watts Outdoor Lighting", "ids": ["498"]}, {"name": "I-Watts PRO", "ids": ["491"]}, {"name": "ICEPURE", "ids": ["462"]}, {"name": "Idealspaten-bredt", "ids": ["277"]}, {"name": "Igloo", "ids": ["549"]}, {"name": "IKON", "ids": ["539"]}, {"name": "Iks", "ids": ["364"]}, {"name": "Illbruck", "ids": ["327"]}, {"name": "IMEX", "ids": ["478"]}, {"name": "Imperial", "ids": ["581"]}, {"name": "Imperial Blades", "ids": ["64"]}, {"name": "Integral", "ids": ["409"]}, {"name": "InterDynamics", "ids": ["65"]}, {"name": "Interlight", "ids": ["175"]}, {"name": "Irion", "ids": ["365"]}, {"name": "Irwin", "ids": ["141"]}, {"name": "Isaw", "ids": ["130"]}, {"name": "Isotronic", "ids": ["410"]}, {"name": "Jackery", "ids": ["486"]}, {"name": "JCB Werkkleding", "ids": ["615"]}, {"name": "Jokari", "ids": ["366"]}, {"name": "JPM", "ids": ["538"]}, {"name": "JSP", "ids": ["367"]}, {"name": "Jumbo", "ids": ["220"]}, {"name": "Jumiko", "ids": ["176"]}, {"name": "Jung Henkelman (niet actief)", "ids": ["333"]}, {"name": "Jung Henkelmann", "ids": ["252"]}, {"name": "Kapro", "ids": ["544"]}, {"name": "Karcher", "ids": ["66"]}, {"name": "Karcher Accessoires", "ids": ["67"]}, {"name": "Kemper", "ids": ["147"]}, {"name": "Keyang", "ids": ["154"]}, {"name": "KFM", "ids": ["120"]}, {"name": "Kimberly-Clark", "ids": ["368"]}, {"name": "Kip", "ids": ["369"]}, {"name": "Kirchhoff", "ids": ["545"]}, {"name": "Kirschen", "ids": ["312"]}, {"name": "Klemko", "ids": ["177"]}, {"name": "Klikaanklikuit", "ids": ["178"]}, {"name": "Klingspor", "ids": ["370"]}, {"name": "Knipex", "ids": ["68"]}, {"name": "Koma tools", "ids": ["625"]}, {"name": "Komo", "ids": ["518"]}, {"name": "Kress", "ids": ["69"]}, {"name": "Kukko", "ids": ["371"]}, {"name": "KWB", "ids": ["485"]}, {"name": "KÄNGABOX", "ids": ["551"]}, {"name": "König", "ids": ["411"]}, {"name": "L-BOXX", "ids": ["528"]}, {"name": "La-Ka-Pe", "ids": ["372"]}, {"name": "LABEL51", "ids": ["223"]}, {"name": "Labor", "ids": ["70"]}, {"name": "LagoLED", "ids": ["191"]}, {"name": "Lagotronics", "ids": ["189"]}, {"name": "Laserliner", "ids": ["71"]}, {"name": "Lawnmaster", "ids": ["505"]}, {"name": "LED Light", "ids": ["506"]}, {"name": "Ledlenser", "ids": ["373"]}, {"name": "LEDsON", "ids": ["253"]}, {"name": "Leica", "ids": ["72"]}, {"name": "Lenco", "ids": ["582"]}, {"name": "Lenox", "ids": ["323"]}, {"name": "Lescha", "ids": ["143"]}, {"name": "Lessmann", "ids": ["374"]}, {"name": "Lips", "ids": ["535"]}, {"name": "Little Jumbo", "ids": ["218"]}, {"name": "Lockweiler", "ids": ["375"]}, {"name": "Logitech", "ids": ["463"]}, {"name": "Lowa", "ids": ["600"]}, {"name": "Lufkin", "ids": ["479"]}, {"name": "M-LOK", "ids": ["202"]}, {"name": "M-LOY", "ids": ["203"]}, {"name": "M-Safe", "ids": ["295"]}, {"name": "Mafell", "ids": ["156"]}, {"name": "Maglite", "ids": ["73"]}, {"name": "Makita", "ids": ["74"]}, {"name": "Makita Accessoires", "ids": ["75"]}, {"name": "Maktec", "ids": ["76"]}, {"name": "Mariani", "ids": ["532"]}, {"name": "Marigold", "ids": ["517"]}, {"name": "Marine", "ids": ["179"]}, {"name": "Martor", "ids": ["376"]}, {"name": "Marxman", "ids": ["480"]}, {"name": "Mas", "ids": ["377"]}, {"name": "Master", "ids": ["77"]}, {"name": "Master Pumps", "ids": ["494"]}, {"name": "Masterlock", "ids": ["78"]}, {"name": "Maxx", "ids": ["79"]}, {"name": "McCulloch", "ids": ["80"]}, {"name": "Mean Well", "ids": ["186"]}, {"name": "Megaman", "ids": ["180"]}, {"name": "Meister", "ids": ["570"]}, {"name": "Melkmeisje", "ids": ["276"]}, {"name": "Memo", "ids": ["201"]}, {"name": "Mesto", "ids": ["378"]}, {"name": "Metabo", "ids": ["81"]}, {"name": "Metabo accessoires", "ids": ["164"]}, {"name": "Metabo Blauw", "ids": ["82"]}, {"name": "Metafranc", "ids": ["576"]}, {"name": "Mi-light", "ids": ["181"]}, {"name": "Michelin", "ids": ["83"]}, {"name": "Milwaukee", "ids": ["84"]}, {"name": "Milwaukee Accessoires", "ids": ["157"]}, {"name": "Mirka", "ids": ["584"]}, {"name": "Mito", "ids": ["136"]}, {"name": "Mobilize", "ids": ["412"]}, {"name": "Moldex", "ids": ["379"]}, {"name": "Morse", "ids": ["313"]}, {"name": "MOTIP", "ids": ["546"]}, {"name": "Movitools", "ids": ["500"]}, {"name": "MTD", "ids": ["145"]}, {"name": "Mul-T-Lock", "ids": ["204"]}, {"name": "Multizaag", "ids": ["284"]}, {"name": "Munters", "ids": ["137"]}, {"name": "Nedis", "ids": ["334"]}, {"name": "Nedo", "ids": ["132"]}, {"name": "Nemef", "ids": ["214"]}, {"name": "NEO", "ids": ["448"]}, {"name": "Neutrik", "ids": ["413"]}, {"name": "Neutrik (niet actief)", "ids": ["254"]}, {"name": "NEWALL", "ids": ["304"]}, {"name": "nieuw", "ids": ["224"]}, {"name": "Nikki.Amsterdam", "ids": ["414"]}, {"name": "Nilfisk Alto", "ids": ["85"]}, {"name": "No Risk", "ids": ["268"]}, {"name": "Noblelift", "ids": ["589"]}, {"name": "Nordic", "ids": ["330"]}, {"name": "Nordic Global", "ids": ["210"]}, {"name": "Norton Clipper", "ids": ["86"]}, {"name": "Novus", "ids": ["87"]}, {"name": "NOW", "ids": ["380"]}, {"name": "NWS", "ids": ["227"]}, {"name": "OMEGA", "ids": ["520"]}, {"name": "Omnimount", "ids": ["415"]}, {"name": "Onbekend merk", "ids": ["21"]}, {"name": "Opti-drill", "ids": ["381"]}, {"name": "Original Lowe", "ids": ["382"]}, {"name": "Oxxa", "ids": ["296"]}, {"name": "Oxypas", "ids": ["585"]}, {"name": "Panasonic", "ids": ["88"]}, {"name": "Parat", "ids": ["89"]}, {"name": "Pard", "ids": ["301"]}, {"name": "Paslode", "ids": ["90"]}, {"name": "Paulmann", "ids": ["158"]}, {"name": "Peddinghaus", "ids": ["326"]}, {"name": "Peha", "ids": ["182"]}, {"name": "Perel", "ids": ["255"]}, {"name": "Perfectmate", "ids": ["91"]}, {"name": "PerfectPro", "ids": ["92"]}, {"name": "Pfaffenhain", "ids": ["205"]}, {"name": "PFERD", "ids": ["303"]}, {"name": "pgb-Europe", "ids": ["444"]}, {"name": "Philips", "ids": ["162"]}, {"name": "Pica", "ids": ["383"]}, {"name": "Picard", "ids": ["384"]}, {"name": "Piergiacomi", "ids": ["416"]}, {"name": "Pingi", "ids": ["464"]}, {"name": "Pinnacle", "ids": ["552"]}, {"name": "Plano", "ids": ["300"]}, {"name": "Plumbob", "ids": ["286"]}, {"name": "Polyfilla", "ids": ["622"]}, {"name": "Poppers", "ids": ["93"]}, {"name": "Power Shared", "ids": ["493"]}, {"name": "Powermaster", "ids": ["523"]}, {"name": "Prevent", "ids": ["385"]}, {"name": "PRF", "ids": ["417"]}, {"name": "Prime Printing Technologies", "ids": ["418"]}, {"name": "Pro XT", "ids": ["316"]}, {"name": "Pro-XT", "ids": ["331"]}, {"name": "Profigold", "ids": ["419"]}, {"name": "Proftec", "ids": ["555"]}, {"name": "Promat", "ids": ["446"]}, {"name": "ProTool", "ids": ["94"]}, {"name": "Provision", "ids": ["211"]}, {"name": "Proxxon", "ids": ["95"]}, {"name": "Puma", "ids": ["386"]}, {"name": "Q-Link", "ids": ["611"]}, {"name": "Qblades", "ids": ["289"]}, {"name": "QS", "ids": ["516"]}, {"name": "Quick", "ids": ["601"]}, {"name": "QwattPro", "ids": ["275"]}, {"name": "Raaco", "ids": ["96"]}, {"name": "Ranex", "ids": ["420"]}, {"name": "Rapid", "ids": ["319"]}, {"name": "Rawl", "ids": ["554"]}, {"name": "Rayovac", "ids": ["421"]}, {"name": "Red Rooster", "ids": ["97"]}, {"name": "Redbrick", "ids": ["266"]}, {"name": "Reebok", "ids": ["602"]}, {"name": "Reheat", "ids": ["565"]}, {"name": "Relectric", "ids": ["481"]}, {"name": "Reled", "ids": ["159"]}, {"name": "Ridgid", "ids": ["98"]}, {"name": "RND Cable", "ids": ["422"]}, {"name": "RND Components", "ids": ["423"]}, {"name": "RND Lab", "ids": ["424"]}, {"name": "Robomow", "ids": ["232"]}, {"name": "Rocalux", "ids": ["212"]}, {"name": "Rockler", "ids": ["287"]}, {"name": "Rodcraft", "ids": ["152"]}, {"name": "Rodia", "ids": ["140"]}, {"name": "Rolith", "ids": ["215"]}, {"name": "Rotadrill", "ids": ["562"]}, {"name": "Rotec", "ids": ["310"]}, {"name": "Rothenberger", "ids": ["387"]}, {"name": "Rotozip", "ids": ["99"]}, {"name": "Roughneck", "ids": ["614"]}, {"name": "Rubi", "ids": ["126"]}, {"name": "Ryobi", "ids": ["100"]}, {"name": "Sabo", "ids": ["272"]}, {"name": "Saemawerk", "ids": ["274"]}, {"name": "Safeet", "ids": ["604"]}, {"name": "Safety Jogger", "ids": ["267"]}, {"name": "SATA", "ids": ["577"]}, {"name": "Scafline", "ids": ["318"]}, {"name": "Scangrip", "ids": ["309"]}, {"name": "Scheppach", "ids": ["129"]}, {"name": "Schmid Schrauben", "ids": ["575"]}, {"name": "Schütte", "ids": ["466"]}, {"name": "Scruffs", "ids": ["288"]}, {"name": "Seal", "ids": ["279"]}, {"name": "Senco", "ids": ["101"]}, {"name": "Shuffle", "ids": ["534"]}, {"name": "Siemens", "ids": ["425"]}, {"name": "Sievert", "ids": ["388"]}, {"name": "SIKA", "ids": ["263"]}, {"name": "Sikkens", "ids": ["623"]}, {"name": "Silverline", "ids": ["148"]}, {"name": "Sixton Peak", "ids": ["264"]}, {"name": "Skil", "ids": ["102"]}, {"name": "Skil Masters", "ids": ["103"]}, {"name": "Skross", "ids": ["426"]}, {"name": "SLV", "ids": ["185"]}, {"name": "Smaart", "ids": ["524"]}, {"name": "SMART", "ids": ["475"]}, {"name": "Smoby", "ids": ["104"]}, {"name": "Sola", "ids": ["105"]}, {"name": "Solide", "ids": ["198"]}, {"name": "Sortimo", "ids": ["106"]}, {"name": "Soudal", "ids": ["146"]}, {"name": "Spero", "ids": ["107"]}, {"name": "Speroni", "ids": ["280"]}, {"name": "SPL", "ids": ["183"]}, {"name": "Spontex", "ids": ["519"]}, {"name": "Staalmeester", "ids": ["511"]}, {"name": "Stabila", "ids": ["108"]}, {"name": "Stahlwille", "ids": ["389"]}, {"name": "Stanley", "ids": ["109"]}, {"name": "Stanley Handgereedschap", "ids": ["110"]}, {"name": "Stanley Koffers", "ids": ["111"]}, {"name": "Stanley Lasers", "ids": ["112"]}, {"name": "Stanley Powertools", "ids": ["567"]}, {"name": "Stapp", "ids": ["605"]}, {"name": "Starmix", "ids": ["113"]}, {"name": "StealthMounts", "ids": ["526"]}, {"name": "Steamy Cool", "ids": ["550"]}, {"name": "Steelies Ultimate", "ids": ["569"]}, {"name": "Steinel", "ids": ["114"]}, {"name": "Steinhauer", "ids": ["239"]}, {"name": "Stiga", "ids": ["216"]}, {"name": "Stihl", "ids": ["135"]}, {"name": "Stihl Accessoires", "ids": ["317"]}, {"name": "Stoer!", "ids": ["531"]}, {"name": "Stroomlijn", "ids": ["213"]}, {"name": "Sunon", "ids": ["427"]}, {"name": "Suspa", "ids": ["455"]}, {"name": "Sweex", "ids": ["428"]}, {"name": "Sylvania", "ids": ["165"]}, {"name": "Systec", "ids": ["559"]}, {"name": "T4all", "ids": ["482"]}, {"name": "Tajima", "ids": ["390"]}, {"name": "TancCo", "ids": ["273"]}, {"name": "Task", "ids": ["525"]}, {"name": "Tasker", "ids": ["430"]}, {"name": "Tayg", "ids": ["283"]}, {"name": "TCE", "ids": ["299"]}, {"name": "TCI", "ids": ["188"]}, {"name": "Tec7", "ids": ["443"]}, {"name": "Technetix", "ids": ["431"]}, {"name": "Teleco", "ids": ["190"]}, {"name": "Telestar", "ids": ["583"]}, {"name": "Telesteps", "ids": ["115"]}, {"name": "Televés", "ids": ["432"]}, {"name": "Telwin", "ids": ["116"]}, {"name": "Tesa", "ids": ["391"]}, {"name": "Timberland Pro", "ids": ["603"]}, {"name": "Toku", "ids": ["117"]}, {"name": "Tollco", "ids": ["461"]}, {"name": "Toolcraft", "ids": ["118"]}, {"name": "ToolKid", "ids": ["315"]}, {"name": "Toolland", "ids": ["256"]}, {"name": "ToolMax cadeaukaart", "ids": ["138"]}, {"name": "Topdrill", "ids": ["563"]}, {"name": "Topex", "ids": ["119"]}, {"name": "Topprotect", "ids": ["290"]}, {"name": "Topstar", "ids": ["392"]}, {"name": "Tork", "ids": ["393"]}, {"name": "Tough Master", "ids": ["488"]}, {"name": "Triax", "ids": ["433"]}, {"name": "Tridonic", "ids": ["192"]}, {"name": "Trio", "ids": ["226"]}, {"name": "Triton", "ids": ["151"]}, {"name": "Trotec", "ids": ["566"]}, {"name": "Tubesca", "ids": ["219"]}, {"name": "Twinner", "ids": ["434"]}, {"name": "Urban interiors", "ids": ["238"]}, {"name": "V-Tac", "ids": ["166"]}, {"name": "Vacmaster", "ids": ["501"]}, {"name": "Vactwister", "ids": ["503"]}, {"name": "Valex", "ids": ["328"]}, {"name": "Vallorbe", "ids": ["302"]}, {"name": "Valueline", "ids": ["435"]}, {"name": "Varma Tec", "ids": ["305"]}, {"name": "Varta", "ids": ["184"]}, {"name": "Velleman", "ids": ["257"]}, {"name": "Vellight", "ids": ["258"]}, {"name": "Verbatim", "ids": ["436"]}, {"name": "Verfhandje", "ids": ["514"]}, {"name": "Viking", "ids": ["265"]}, {"name": "Visaton", "ids": ["437"]}, {"name": "Vitility", "ids": ["438"]}, {"name": "W.Steps", "ids": ["564"]}, {"name": "Waelbers", "ids": ["297"]}, {"name": "Wagner", "ids": ["134"]}, {"name": "Waku", "ids": ["217"]}, {"name": "Walkmate", "ids": ["456"]}, {"name": "Waterloo", "ids": ["121"]}, {"name": "WD-40", "ids": ["509"]}, {"name": "Weidmüller", "ids": ["612"]}, {"name": "Weldon", "ids": ["588"]}, {"name": "Wellcut", "ids": ["321"]}, {"name": "Weller", "ids": ["439"]}, {"name": "Wera", "ids": ["122"]}, {"name": "Werkzeyt", "ids": ["574"]}, {"name": "Whirlpool", "ids": ["440"]}, {"name": "Wiha", "ids": ["123"]}, {"name": "WinBag", "ids": ["483"]}, {"name": "Wiss", "ids": ["484"]}, {"name": "Wolf Garten", "ids": ["124"]}, {"name": "Wolfcraft", "ids": ["234"]}, {"name": "Woodies", "ids": ["285"]}, {"name": "Workmen", "ids": ["504"]}, {"name": "WPRO", "ids": ["441"]}, {"name": "X-Performer", "ids": ["489"]}, {"name": "Yale", "ids": ["540"]}, {"name": "Yokota", "ids": ["125"]}, {"name": "Youngman", "ids": ["236"]}];

(function () {
  const tab = document.getElementById("tab-brandblocks");
  if (!tab) return;

  const sel = tab.querySelector("#bb-merk");
  const idsWrap = tab.querySelector("#bb-ids");
  const imgInp = tab.querySelector("#bb-img");
  const out = tab.querySelector("#bb-result");

  const copyBtn = tab.querySelector(".bb-copy");
  const clearBtn = tab.querySelector(".bb-clear");

  // ---------- helpers ----------
  function esc(str) {
    return String(str)
      .replace(/\\/g, "\\\\")
      .replace(/\"/g, "\\\"");
  }

  function setIdsUI(merkObj) {
    idsWrap.innerHTML = "";
    if (!merkObj) return;

    const ids = Array.isArray(merkObj.ids) ? merkObj.ids : [];
    if (!ids.length) return;

    // Als er maar 1 id is: toon readonly
    if (ids.length === 1) {
      const id = ids[0];
      idsWrap.innerHTML = `
        <div class="bb-id-single">
          <label>ID</label>
          <input type="text" value="${id}" readonly>
        </div>
      `;
      return;
    }

    // Meerdere ids: checkbox lijst + selecteer alles/geen
    const top = document.createElement("div");
    top.className = "bb-ids-actions";
    top.innerHTML = `
      <button type="button" class="bb-mini bb-all">Alles</button>
      <button type="button" class="bb-mini bb-none">Geen</button>
      <span class="bb-hint">Kies welke ID(s) je wilt genereren</span>
    `;
    idsWrap.appendChild(top);

    const list = document.createElement("div");
    list.className = "bb-ids-list";

    ids.forEach((id, idx) => {
      const item = document.createElement("label");
      item.className = "bb-id-item";
      item.innerHTML = `
        <input type="checkbox" class="bb-id-check" value="${id}" ${idx === 0 ? "checked" : ""}>
        <span>${id}</span>
      `;
      list.appendChild(item);
    });

    idsWrap.appendChild(list);

    top.querySelector(".bb-all").addEventListener("click", () => {
      idsWrap.querySelectorAll(".bb-id-check").forEach(c => (c.checked = true));
      generate();
    });

    top.querySelector(".bb-none").addEventListener("click", () => {
      idsWrap.querySelectorAll(".bb-id-check").forEach(c => (c.checked = false));
      generate();
    });
  }

  function getSelectedIds(merkObj) {
    if (!merkObj) return [];
    const ids = Array.isArray(merkObj.ids) ? merkObj.ids : [];
    if (!ids.length) return [];

    if (ids.length === 1) return [ids[0]];

    return [...idsWrap.querySelectorAll(".bb-id-check:checked")].map(x => x.value);
  }

  function generate() {
    const merkName = sel.value || "";
    const merkObj = BRAND_CATEGORIEBLOKKEN.find(x => x.name === merkName);

    const img = (imgInp.value || "").trim();
    const ids = getSelectedIds(merkObj);

    if (!merkName || !ids.length || !img) {
      out.textContent = "";
      return;
    }

    const lines = ids.map(id =>
      `{ name:"${esc(merkName)}", ids:["${esc(id)}"], combine:"single", img:"${esc(img)}" },`
    );

    out.textContent = lines.join("\n");
  }

  function fillMerken() {
    const data = [...BRAND_CATEGORIEBLOKKEN].sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase(), "nl")
    );

    sel.innerHTML =
      `<option value="">Kies een merk…</option>` +
      data.map(m => `<option value="${m.name}">${m.name}</option>`).join("");
  }

  // ---------- events ----------
  sel.addEventListener("change", () => {
    const merkName = sel.value || "";
    const merkObj = BRAND_CATEGORIEBLOKKEN.find(x => x.name === merkName);
    setIdsUI(merkObj);
    generate();
  });

  imgInp.addEventListener("input", generate);
  idsWrap.addEventListener("change", generate);

  copyBtn?.addEventListener("click", () => {
    const txt = out.textContent.trim();
    if (!txt) return;

    navigator.clipboard.writeText(txt).then(() => {
      const original = copyBtn.textContent;
      copyBtn.textContent = "Copied";
      copyBtn.style.background = "#609942";
      copyBtn.style.color = "#fff";
      setTimeout(() => {
        copyBtn.textContent = original;
        copyBtn.style.background = "";
        copyBtn.style.color = "";
      }, 1500);
    });
  });

  clearBtn?.addEventListener("click", () => {
    sel.value = "";
    imgInp.value = "";
    idsWrap.innerHTML = "";
    out.textContent = "";
  });

  // init
  fillMerken();
})();
