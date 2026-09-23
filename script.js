/**
 * XiEl — Portfolio Scripts (Post-Production, Video & Motion Design)
 * Internationalization, Live Timecode, Project Filtering, Modal & Interactions
 */

const translations = {
    fr: {
        // Navigation
        nav_status_live: "DISPONIBLE POUR PROJETS",
        nav_home: "Accueil",
        nav_projects: "Projets",
        nav_expertise: "Expertise",
        nav_about: "À Propos",
        nav_contact: "Contact",

        // Hero Section
        hero_tagline: "POST-PRODUCTION & MOTION STUDIO",
        hero_lead: "Créatif pluridisciplinaire spécialisé en montage vidéo rythmique, motion design et étalonnage cinématique. Chaque coupe, chaque transition et chaque nuance de couleur sont calibrées avec une précision chirurgicale.",
        hero_cta_projects: "Explorer les Projets",
        hero_cta_contact: "Me Contacter",

        // Filters
        filter_all: "Tous",
        filter_video: "Vidéo",
        filter_motion: "Motion",
        filter_photo: "Photo",

        // Projects Section
        sect_projects_tag: "[ 01 // PORTFOLIO ]",
        sect_projects_title: "Projets Sélectionnés",
        sect_projects_desc: "Une vitrine de mes réalisations les plus marquantes en vidéo, motion design et photographie.",
        see_all_projects: "Consulter Tous les Projets",

        // Project Page
        projects_page_tag: "[ ARCHIVES & SÉLECTION ]",
        projects_page_title: "Catalogue des Projets",
        projects_page_desc: "Une vue exhaustive de mes réalisations en montage, habillage graphique, étalonnage et reportages photographiques.",

        // Projects Meta Labels & Values
        meta_cat: "Catégorie :",
        meta_year: "Année :",
        meta_role: "Rôle :",
        meta_tools: "Logiciels :",
        meta_gear: "Matériel :",

        val_av: "Audiovisuel & Montage",
        val_edit: "Montage & Cadrage",
        val_director: "Réalisation & Montage",
        val_motion: "Motion Design",
        val_motion_designer: "Motion Designer",
        val_photo: "Photographie",
        val_photographer: "Photographe",
        val_visual_graphist: "Graphisme & DA",

        // Specific Projects Info
        project_headlock: "Edit Motion Design — Headlock",
        h1_headlock: "Edit Motion Design — Headlock",
        project_headlock_desc: "Synchronisation visuelle et géométrie rythmique animée sur piste sonore complexe.",
        
        project_clip: "Clip Musical",
        h1_clip: "Clip Musical — Direction & Montage",
        project_clip_desc: "Production vidéo intégrant des effets visuels, montage rythmique et travail colorimétrique.",

        project_clip_iut: "Promotion IUT",
        h1_clip_iut: "Clip Promotionnel — IUT",
        project_clip_iut_desc: "Film promotionnel dynamique mettant en lumière la vie étudiante et les infrastructures.",

        project_hypnose: "Nuit de l'Hypnose",
        h1_hypnose: "Identité Visuelle — Nuit de l'Hypnose",
        project_hypnose_desc: "Conception de l'identité visuelle complète et des supports pour un événement caritatif.",

        project_karting: "Karting & Adrénaline",
        h1_karting: "Série Photo — Karting & Vitesse",
        project_karting_desc: "Prises de vue haute vitesse sur piste, figeant la tension, les trajectoires et l'intensité.",

        project_portrait: "Série Portrait & Mood",
        h1_portrait: "Série Photo — Portraits Urbains",
        project_portrait_desc: "Portraits en lumière ambiante naturelle avec traitement poussé des contrastes et de la texture.",

        project_fete_musique: "Fête de la Musique — Live",
        h1_fete_musique: "Reportage Photo — Fête de la Musique",
        project_fete_musique_desc: "Reportage de concerts à Arras capturant la vibration scénique et l'effervescence du public.",

        project_photo: "Série Féline & Nature",
        h1_photo: "Série Photo — Exploration Féline",
        project_photo_desc: "Série de captures en environnement naturel axée sur le regard, l'attitude et la composition.",

        project_astrophoto: "Astrophotographie",
        h1_astrophoto: "Série Photo — Astrophotographie",
        project_astrophoto_desc: "Captures en pose longue de ciels étoilés et paysages nocturnes avec réduction de bruit.",

        // Project Detail Structure
        back_projects: "← RETOUR AUX PROJETS",
        p_the_project: "Le Projet",
        p_approach: "Approche Créative & Technique",
        p_tools: "Outils & Technologies",
        p_resources: "Fichiers & Livrables",
        p_view_drive: "Accéder au dossier Drive",

        // Project Descriptions
        p_headlock_desc_1: "Un projet de motion design rythmé sur la musique 'Headlock'. Ce projet explore la synchronisation visuelle avec le son et l'utilisation de formes géométriques dynamiques.",
        p_headlock_approach_1: "L'objectif était de créer une expérience visuelle immersive qui suit parfaitement le tempo musical, en utilisant des courbes d'animation fluides et des transitions percutantes.",
        p_headlock_tools_1: "Logiciel : Adobe After Effects",
        p_headlock_resources_1: "Le projet et le rendu final sont disponibles sur le Drive.",

        p_clip_desc_1: "Ce clip de musique a été réalisé dans le cadre d'un cours de création numérique. Il met en avant mes compétences en montage vidéo, compositing et étalonnage.",
        p_clip_approach_1: "L'objectif était de concevoir un univers visuel fort au service du morceau, en alternant rythmique serrée et plans narratifs soignés.",
        p_clip_tools_1: "Logiciels : Adobe Premiere Pro, Adobe After Effects, Adobe Photoshop",
        p_clip_resources_1: "Accédez à la vidéo complète sur le Drive.",

        p_clip_iut_desc_1: "Réalisation d'une vidéo promotionnelle pour valoriser les formations, l'ambiance étudiante et les équipements modernes de l'IUT.",
        p_clip_iut_approach_1: "Prises de vue dynamiques, cadrage immersif et montage punchy pour capturer l'énergie authentique du campus.",
        p_clip_iut_tools_1: "Logiciels : Adobe Premiere Pro, Adobe After Effects",
        p_clip_iut_resources_1: "Accédez à la vidéo sur le Drive.",

        p_hypnose_desc_1: "Création d'une identité visuelle complète pour la deuxième édition de la Nuit de l'Hypnose à Lens, organisée au profit d'une association caritative.",
        p_hypnose_approach_1: "Élaboration d'une palette mystérieuse et moderne (tons nocturnes et dorés), typographies impactantes et déclinaison sur affiches, réseaux sociaux et billets.",
        p_hypnose_tools_1: "Logiciels : Adobe Photoshop, Adobe Illustrator",
        p_hypnose_resources_1: "Accédez à l'ensemble des livrables graphiques sur le Drive.",

        p_karting_desc_1: "Série photographique dédiée à la vitesse, l'adrénaline et la précision du pilotage sur circuit de karting.",
        p_karting_approach_1: "Utilisation de vitesses d'obturation ultra-rapides pour figer les projections et les regards sous la visière, complétée par un étalonnage contrasté.",
        p_karting_tools_1: "Matériel : Canon EOS 2000D, 70-300mm f/4-6.3",
        p_karting_tools_2: "Logiciel : Adobe Lightroom",
        p_karting_resources_1: "Accédez à la galerie complète sur le Drive.",

        p_portrait_desc_1: "Séance photo portrait en extérieur explorant les expressions naturelles, la texture et les nuances d'éclairage urbain.",
        p_portrait_approach_1: "Mise en valeur de la profondeur de champ, étalonnage délicat des carnations et composition guidée par les lignes d'architecture.",
        p_portrait_tools_1: "Matériel : Sony a6400, 16-50mm & 55-210mm",
        p_portrait_tools_2: "Logiciel : Adobe Lightroom",
        p_portrait_resources_1: "Accédez au shooting complet sur le Drive.",

        p_fete_musique_desc_1: "Reportage photo capturant l'effervescence et les performances scéniques lors de la Fête de la Musique à Arras.",
        p_fete_musique_approach_1: "Gestion réactive des éclairages de scène changeants, cadrages variés entre plans d'ensemble et gros plans expressifs des musiciens.",
        p_fete_musique_tools_1: "Matériel : Sony a6400, 16-50mm & 55-210mm",
        p_fete_musique_tools_2: "Logiciel : Adobe Lightroom",
        p_fete_musique_resources_1: "Accédez à l'album complet sur le Drive.",

        p_photo_desc_1: "Série animalière capturant l'agilité, la curiosité et le regard expressif d'un sujet félin en milieu naturel.",
        p_photo_approach_1: "Exploitation de la lumière rasante naturelle et mise au point précise sur le regard pour souligner les détails du pelage.",
        p_photo_tools_1: "Matériel : Canon EOS 2000D, 18-55mm f/3.5-5.6",
        p_photo_tools_2: "Logiciel : Adobe Lightroom",
        p_photo_resources_1: "Accédez aux clichés sur le Drive.",

        p_astrophoto_desc_1: "Série photographique dédiée aux ciels nocturnes, aux constellations et aux paysages sous les étoiles.",
        p_astrophoto_approach_1: "Prises de vue en pose longue sur trépied, mise au point manuelle à l'infini et développement numérique avec gestion fine du bruit.",
        p_astrophoto_tools_1: "Matériel : Sony a6400, Trépied",
        p_astrophoto_tools_2: "Logiciel : Adobe Lightroom",
        p_astrophoto_resources_1: "Accédez aux fichiers sur le Drive.",

        // Expertise Section
        sect_expertise_tag: "[ 02 // WORKFLOW & EXPERTISE ]",
        sect_expertise_title: "Post-Production & Compétences",
        sect_expertise_desc: "Une maîtrise technique complète pour sublimer vos images de la prise de vue au master final.",
        exp_edit_title: "Montage & Rythme",
        exp_edit_desc: "Construction narrative, découpage percutant, gestion fine de la timeline et synchronisation sonore au millième de seconde.",
        exp_motion_title: "Motion Design & VFX",
        exp_motion_desc: "Création d'animations graphiques fluides, typographie cinétique, incrustations, compositing et habillages vidéo.",
        exp_color_title: "Étalonnage & Color Science",
        exp_color_desc: "Normalisation LOG vers REC.709, harmonisation des plans, gestion des teintes et création de palettes cinématiques immersives.",
        exp_photo_title: "Photographie & Retouche",
        exp_photo_desc: "Cadrage soigné, gestion de la lumière ambiante, retouche chromatique poussée et sublimation des textures.",
        tools_title: "Suite Logicielle & Outils de Production",

        // About Section
        sect_about_tag: "[ 03 // VISION & PROFIL ]",
        sect_about_title: "À Propos de XiEl",
        about_quote: "\"La post-production n'est pas une simple étape technique, c'est l'art de donner un rythme, une tension et une âme durable à chaque image.\"",
        about_body: "Je m'appelle Alexis Carpentier (XiEl). Passionné par l'art du montage, du motion design et de la prise de vue, je conçois des projets visuels qui allient exigence technique et narration forte. Mon approche repose sur une écoute attentive des besoins et une exécution millimétrée.",
        spec_location_label: "Localisation",
        spec_focus_label: "Spécialisation",
        download_cv: "Télécharger le CV",
        metric_precision: "Précision & Rigueur",
        metric_quality: "Standard Master Ultra HD",
        metric_disciplines: "Disciplines Maîtrisées",
        metric_cinema: "Sensibilité Cinéma",

        // Contact Section
        sect_contact_tag: "[ 04 // CONTACT & COLLABORATION ]",
        contact_heading: "Donnons vie à votre prochain projet visuel.",
        contact_lead: "Vous avez un projet de clip, un besoin en motion design, un montage vidéo ou une série photographique ? Parlons-en et créons quelque chose d'exceptionnel.",
        contact_email_btn: "Me Contacter par Email",

        // Modal
        modal_title: "Prendre Contact",
        modal_subtitle: "Copiez mes coordonnées directes pour démarrer une collaboration.",
        modal_btn_copy: "COPIER",
        modal_btn_done: "COPIÉ !",
        modal_feedback: "Adresse copiée dans le presse-papier :"
    },

    en: {
        // Navigation
        nav_status_live: "AVAILABLE FOR WORK",
        nav_home: "Home",
        nav_projects: "Projects",
        nav_expertise: "Expertise",
        nav_about: "About",
        nav_contact: "Contact",

        // Hero Section
        hero_tagline: "POST-PRODUCTION & MOTION STUDIO",
        hero_lead: "Multidisciplinary visual creator specializing in rhythmic video editing, motion design, and cinematic color grading. Every cut, transition, and color tone is crafted with surgical precision.",
        hero_cta_projects: "Explore Projects",
        hero_cta_contact: "Get in Touch",

        // Filters
        filter_all: "All",
        filter_video: "Video",
        filter_motion: "Motion",
        filter_photo: "Photo",

        // Projects Section
        sect_projects_tag: "[ 01 // PORTFOLIO ]",
        sect_projects_title: "Selected Works",
        sect_projects_desc: "A showcase of key projects across video editing, motion design, and photography.",
        see_all_projects: "View All Projects",

        // Project Page
        projects_page_tag: "[ ARCHIVES & SELECTION ]",
        projects_page_title: "Projects Catalog",
        projects_page_desc: "An exhaustive overview of my works in video editing, motion graphics, color grading, and photography.",

        // Projects Meta Labels & Values
        meta_cat: "Category:",
        meta_year: "Year:",
        meta_role: "Role:",
        meta_tools: "Software:",
        meta_gear: "Gear:",

        val_av: "Audiovisual & Editing",
        val_edit: "Editing & Camera",
        val_director: "Direction & Editing",
        val_motion: "Motion Design",
        val_motion_designer: "Motion Designer",
        val_photo: "Photography",
        val_photographer: "Photographer",
        val_visual_graphist: "Graphic & Art Direction",

        // Specific Projects Info
        project_headlock: "Motion Design Edit — Headlock",
        h1_headlock: "Motion Design Edit — Headlock",
        project_headlock_desc: "Visual synchronization and dynamic geometric animation on an intricate soundtrack.",
        
        project_clip: "Music Video",
        h1_clip: "Music Video — Direction & Editing",
        project_clip_desc: "Video production featuring visual effects, rhythmic pacing, and cinematic color grading.",

        project_clip_iut: "Academy Promotional Video",
        h1_clip_iut: "Promotional Clip — IUT",
        project_clip_iut_desc: "Dynamic promotional video highlighting student life and modern campus facilities.",

        project_hypnose: "Hypnosis Night",
        h1_hypnose: "Visual Identity — Hypnosis Night",
        project_hypnose_desc: "Complete visual identity design and print/digital assets for a charity event.",

        project_karting: "Karting & Speed",
        h1_karting: "Photo Series — Karting & Racing",
        project_karting_desc: "High-speed trackside captures freezing adrenaline, driver focus, and racing motion.",

        project_portrait: "Portrait & Mood Series",
        h1_portrait: "Photo Series — Urban Portraits",
        project_portrait_desc: "Natural light portraits with meticulous skin tone treatment and atmospheric lighting.",

        project_fete_musique: "Fête de la Musique — Live",
        h1_fete_musique: "Concert Photography — Fête de la Musique",
        project_fete_musique_desc: "Live concert reportage in Arras capturing stage energy and audience emotion.",

        project_photo: "Feline & Nature Series",
        h1_photo: "Photo Series — Feline Observation",
        project_photo_desc: "Wildlife exploration series focusing on gaze, textures, and precise framing.",

        project_astrophoto: "Astrophotography",
        h1_astrophoto: "Photo Series — Astrophotography",
        project_astrophoto_desc: "Long exposure night sky captures of celestial landscapes with advanced noise reduction.",

        // Project Detail Structure
        back_projects: "← BACK TO PROJECTS",
        p_the_project: "The Project",
        p_approach: "Creative & Technical Approach",
        p_tools: "Tools & Technologies",
        p_resources: "Files & Deliverables",
        p_view_drive: "Access Google Drive Folder",

        // Project Descriptions
        p_headlock_desc_1: "A motion design project set to the track 'Headlock'. This project explores visual sound synchronization and rhythmic geometric animation.",
        p_headlock_approach_1: "The goal was to create an immersive visual experience perfectly locked to the audio tempo, using fluid easing curves and punchy transitions.",
        p_headlock_tools_1: "Software: Adobe After Effects",
        p_headlock_resources_1: "Project source files and full renders are available on Google Drive.",

        p_clip_desc_1: "Music video produced as part of digital media coursework, demonstrating editing, compositing, and color grading skills.",
        p_clip_approach_1: "Building a compelling visual atmosphere aligned with the music, balancing fast-paced rhythmic cuts and cinematic storytelling.",
        p_clip_tools_1: "Software: Adobe Premiere Pro, Adobe After Effects, Adobe Photoshop",
        p_clip_resources_1: "Access the full video render on Google Drive.",

        p_clip_iut_desc_1: "Promotional video showcasing academic programs, campus culture, and state-of-the-art facilities.",
        p_clip_iut_approach_1: "Dynamic camera movement, engaging framing, and punchy editing to capture authentic campus energy.",
        p_clip_iut_tools_1: "Software: Adobe Premiere Pro, Adobe After Effects",
        p_clip_iut_resources_1: "Access the video on Google Drive.",

        p_hypnose_desc_1: "Creation of the full visual branding for the second edition of Hypnosis Night in Lens, supporting a charitable cause.",
        p_hypnose_approach_1: "Curating a moody, modern palette (night blues and gold), impactful typography, and adapting across posters, social media, and tickets.",
        p_hypnose_tools_1: "Software: Adobe Photoshop, Adobe Illustrator",
        p_hypnose_resources_1: "Access all project design deliverables on Google Drive.",

        p_karting_desc_1: "A photography series dedicated to speed, adrenaline, and precision on the karting track.",
        p_karting_approach_1: "Using fast shutter speeds to freeze trackside action, tire spray, and intense driver focus, paired with punchy color grading.",
        p_karting_tools_1: "Gear: Canon EOS 2000D, 70-300mm f/4-6.3",
        p_karting_tools_2: "Software: Adobe Lightroom",
        p_karting_resources_1: "Access the full photo gallery on Google Drive.",

        p_portrait_desc_1: "Outdoor lifestyle portrait session capturing authentic mood, texture, and natural ambient light.",
        p_portrait_approach_1: "Shallow depth of field, meticulous skin tone calibration, and compositions framed by urban architecture.",
        p_portrait_tools_1: "Gear: Sony a6400, 16-50mm & 55-210mm",
        p_portrait_tools_2: "Software: Adobe Lightroom",
        p_portrait_resources_1: "Access the full photo set on Google Drive.",

        p_fete_musique_desc_1: "Photo reportage capturing live performances and atmosphere during the Fête de la Musique in Arras.",
        p_fete_musique_approach_1: "Mastering volatile stage lighting, balancing wide crowd perspectives and tight artist close-ups.",
        p_fete_musique_tools_1: "Gear: Sony a6400, 16-50mm & 55-210mm",
        p_fete_musique_tools_2: "Software: Adobe Lightroom",
        p_fete_musique_resources_1: "Access the complete event album on Google Drive.",

        p_photo_desc_1: "Wildlife series capturing the feline gaze, agile movement, and natural textures.",
        p_photo_approach_1: "Leveraging soft natural side lighting and razor-sharp focal placement to highlight texture.",
        p_photo_tools_1: "Gear: Canon EOS 2000D, 18-55mm f/3.5-5.6",
        p_photo_tools_2: "Software: Adobe Lightroom",
        p_photo_resources_1: "Access the full image files on Google Drive.",

        p_astrophoto_desc_1: "Photography series capturing night skies, celestial bodies, and landscapes under the stars.",
        p_astrophoto_approach_1: "Long exposure tripod captures, manual infinity focus, and digital post-processing with careful noise control.",
        p_astrophoto_tools_1: "Gear: Sony a6400, Tripod",
        p_astrophoto_tools_2: "Software: Adobe Lightroom",
        p_astrophoto_resources_1: "Access celestial captures on Google Drive.",

        // Expertise Section
        sect_expertise_tag: "[ 02 // WORKFLOW & EXPERTISE ]",
        sect_expertise_title: "Post-Production & Capabilities",
        sect_expertise_desc: "End-to-end technical mastery to elevate your visuals from production to final master.",
        exp_edit_title: "Editing & Rhythm",
        exp_edit_desc: "Narrative structuring, impactful cutting, timeline optimization, and sub-frame audio synchronization.",
        exp_motion_title: "Motion Design & VFX",
        exp_motion_desc: "Fluid graphic animations, kinetic typography, keying, compositing, and video branding.",
        exp_color_title: "Color Grading & Science",
        exp_color_desc: "LOG to REC.709 normalization, shot matching, skin tone protection, and cinematic look creation.",
        exp_photo_title: "Photography & Retouching",
        exp_photo_desc: "Meticulous framing, ambient light control, color correction, and high-end texture enhancement.",
        tools_title: "Production Software & Toolkit",

        // About Section
        sect_about_tag: "[ 03 // VISION & PROFILE ]",
        sect_about_title: "About XiEl",
        about_quote: "\"Post-production is not merely a technical phase—it is the art of giving rhythm, tension, and lasting soul to every frame.\"",
        about_body: "I am Alexis Carpentier (XiEl). Passionate about the art of video editing, motion design, and photography, I create visual projects blending technical precision with powerful storytelling.",
        spec_location_label: "Location",
        spec_focus_label: "Focus",
        download_cv: "Download Resume",
        metric_precision: "Precision & Rigor",
        metric_quality: "Ultra HD Master Standard",
        metric_disciplines: "Core Disciplines",
        metric_cinema: "Cinematic Pacing",

        // Contact Section
        sect_contact_tag: "[ 04 // CONTACT & COLLABORATION ]",
        contact_heading: "Let's bring your next visual project to life.",
        contact_lead: "Looking for a music video editor, motion designer, colorist, or photographer? Let's connect and craft something remarkable.",
        contact_email_btn: "Contact via Email",

        // Modal
        modal_title: "Get in Touch",
        modal_subtitle: "Copy my direct contact details to start a collaboration.",
        modal_btn_copy: "COPY",
        modal_btn_done: "COPIED!",
        modal_feedback: "Copied to clipboard:"
    }
};

/**
 * Update Language throughout the DOM
 */
function updateLanguage(lang) {
    localStorage.setItem('preferredLanguage', lang);
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            // If element contains child icons or specific elements, preserve them or handle cleanly
            const icon = element.querySelector('i');
            if (icon) {
                const iconHTML = icon.outerHTML;
                element.innerHTML = `${translations[lang][key]} ${iconHTML}`;
            } else {
                element.innerText = translations[lang][key];
            }
        }
    });

    // Update language toggle button
    const toggleBtn = document.getElementById('lang-toggle');
    if (toggleBtn) {
        const span = toggleBtn.querySelector('span');
        if (span) {
            span.innerText = lang === 'en' ? 'FR' : 'EN';
        }
    }
}

/**
 * Initialize Everything on DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Language Initialization
    const savedLang = localStorage.getItem('preferredLanguage') || 'fr';
    updateLanguage(savedLang);

    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const currentLang = localStorage.getItem('preferredLanguage') || 'fr';
            const newLang = currentLang === 'en' ? 'fr' : 'en';
            updateLanguage(newLang);
        });
    }

    // 2. Mobile Hamburger Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 3. Live 24 FPS Timecode Generator
    const timecodeElem = document.getElementById('live-tc');
    if (timecodeElem) {
        let hours = 0;
        let minutes = 1;
        let seconds = 24;
        let frames = 12;

        setInterval(() => {
            frames++;
            if (frames >= 24) {
                frames = 0;
                seconds++;
                if (seconds >= 60) {
                    seconds = 0;
                    minutes++;
                    if (minutes >= 60) {
                        minutes = 0;
                        hours = (hours + 1) % 24;
                    }
                }
            }
            const pad = (n) => String(n).padStart(2, '0');
            timecodeElem.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
        }, 1000 / 24);
    }

    // 4. Project Filtering System
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(15px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 250);
                    }
                });
            });
        });
    }

    // 5. Scroll Reveal with Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.08
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(el => {
        scrollObserver.observe(el);
    });

    // 6. Navigation ScrollSpy
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links li a[href^="#"]');

    function highlightNavigation() {
        const scrollY = window.scrollY;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });

        if (scrollY < 120) {
            navItems.forEach(item => item.classList.remove('active'));
            const homeLink = document.querySelector('.nav-links li a[href="#home"]');
            if (homeLink) homeLink.classList.add('active');
        }
    }

    if (sections.length > 0 && navItems.length > 0) {
        window.addEventListener('scroll', highlightNavigation);
        highlightNavigation();
    }

    // 7. Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 8. Contact Quick Modal
    initContactModal();
});

/**
 * Initialize Quick Contact Modal
 */
function initContactModal() {
    const modalHTML = `
    <div id="contactModal" class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <div class="modal-content">
            <button class="modal-close" aria-label="Fermer la modal">&times;</button>
            <h3 id="modalTitle" class="modal-title" data-i18n="modal_title">Prendre Contact</h3>
            <p class="modal-subtitle" data-i18n="modal_subtitle">Copiez mes coordonnées directes pour démarrer une collaboration.</p>
            
            <div class="copy-row">
                <span class="copy-text">alexiscarpentier62@gmail.com</span>
                <button class="copy-btn" data-copy="alexiscarpentier62@gmail.com" data-i18n="modal_btn_copy">COPIER</button>
            </div>

            <div class="copy-row">
                <span class="copy-text">Instagram : @crpt.alexis</span>
                <button class="copy-btn" data-copy="https://instagram.com/crpt.alexis" data-i18n="modal_btn_copy">COPIER</button>
            </div>

            <div class="copy-feedback"></div>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('contactModal');
    const closeBtn = modal.querySelector('.modal-close');
    const copyBtns = modal.querySelectorAll('.copy-btn');
    const feedback = modal.querySelector('.copy-feedback');

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Trigger modal when clicking specific contact action
    const contactTrigger = document.querySelector('a[href="mailto:alexiscarpentier62@gmail.com"].btn-primary');
    if (contactTrigger) {
        contactTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            const lang = localStorage.getItem('preferredLanguage') || 'fr';

            navigator.clipboard.writeText(textToCopy).then(() => {
                btn.textContent = translations[lang].modal_btn_done;
                feedback.textContent = `${translations[lang].modal_feedback} ${textToCopy}`;
                feedback.classList.add('visible');

                setTimeout(() => {
                    btn.textContent = translations[lang].modal_btn_copy;
                    feedback.classList.remove('visible');
                }, 2200);
            }).catch(err => {
                console.error('Clipboard copy failed:', err);
            });
        });
    });
}
