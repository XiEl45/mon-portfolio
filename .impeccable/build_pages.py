#!/usr/bin/env python3
"""Writes the portfolio's HTML pages (home, about, one page per project, redirects).

The generated HTML is the source of truth for the site; this script only saves retyping the shared
header, footer and project layout. Run from the project root:  python3 .impeccable/build_pages.py
"""
import html, json, os

V = '4.3'
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAIL = 'alexiscarpentier62@gmail.com'
INSTA = 'https://instagram.com/crpt.alexis'
DRIVE = 'https://drive.google.com/drive/folders/1_y956-n0lu6Cf3o4KRdbzAObhT7Ay_kQ?usp=sharing'
FONTS = 'https://fonts.googleapis.com/css2?family=League+Gothic&family=Archivo:wght@400;500;600&display=swap'
THREE = 'https://cdn.jsdelivr.net/npm/three@0.149.0/build/three.min.js'

e = html.escape
def en(s):
    return f' data-en="{e(s, quote=True)}"'

# ---------------------------------------------------------------- projects (strip order)
W = 'images/work/'
PROJECTS = [
 dict(slug='ready-to-die', file='project-clip.html', t='Ready To Die', l=['Ready', 'To Die'], y='2025',
      type='Clip musical', typeEn='Music video', role='Co-réalisation · montage', roleEn='Co-direction · editing',
      tools='Premiere Pro · After Effects',
      cover=W+'ready-to-die-titre.webp', hero=W+'ready-to-die-extrait-poster.webp',
      video=W+'ready-to-die-extrait.mp4', poster=W+'ready-to-die-extrait-poster.webp',
      strip_video='images/clip-loop.mp4', strip_poster='images/clip-loop-poster.webp',
      drive='https://drive.google.com/drive/folders/1folDQ5OOuUVceC_1FMlf0JgqiMorxnQ4?usp=sharing',
      lede='Un clip tourné en équipe dans le cadre d’un cours de création numérique. J’ai co-écrit et co-réalisé le projet, puis assuré le montage.',
      ledeEn='A music video shot as a team for a digital creation course. I co-wrote and co-directed it, then edited it.',
      body='Le montage suit la structure du morceau : les plans de nuit et les séquences en extérieur s’enchaînent sur ses changements, pour que l’image respire avec la musique.',
      bodyEn='The edit follows the structure of the track: night shots and outdoor sequences cut on its changes, so the picture breathes with the music.',
      facts=[('Format', 'Format', '16:9 · 1080p', '16:9 · 1080p'), ('Contexte', 'Context', 'Projet de cours, en équipe', 'Course project, team work')],
      credits=[('Montage', 'Editing', 'Alexis Carpentier'),
               ('Réalisation', 'Direction', 'Olivier Le-Riche, Fatema El-Barghouti, Alexis Carpentier'),
               ('Écriture', 'Writing', 'Marion Bacquet, Alexis Carpentier, Fatema El-Barghouti, Olivier Le-Riche'),
               ('Actrice principale', 'Lead actress', 'Marion Bacquet')],
      gallery=[W+f'ready-to-die-{k}.webp' for k in (1, 3, 4, 5, 6)], square=False),
 dict(slug='headlock', file='project-headlock.html', t='Headlock', l=['Head', 'Lock'], y='2025',
      type='Edit motion design', typeEn='Motion design edit', role='Motion design · synchro son', roleEn='Motion design · sound sync',
      tools='After Effects',
      cover=W+'headlock-cover.webp', hero=W+'headlock-poster.webp', video=W+'headlock-extrait.mp4', poster=W+'headlock-poster.webp',
      drive='https://drive.google.com/drive/folders/1QxxkjN6shY0BIW77N7gtX_kCr9IXY-PE?usp=sharing',
      lede='Un edit en motion design calé sur le morceau « Headlock » : chaque forme, chaque mot arrive sur le son.',
      ledeEn='A motion design edit timed to the track “Headlock”: every shape and every word lands on the sound.',
      body='Le projet explore la synchronisation visuelle avec la musique : typographie animée, formes géométriques et transitions franches qui suivent le tempo.',
      bodyEn='The project explores syncing visuals to music: kinetic type, geometric shapes and sharp transitions that follow the tempo.',
      facts=[('Format', 'Format', 'Carré · 1:1', 'Square · 1:1'), ('Contexte', 'Context', 'Projet personnel', 'Personal project')],
      credits=[], gallery=[W+'headlock-1.webp', W+'headlock-2.webp', W+'headlock-3.webp'], square=True),
 dict(slug='promo-iut', file='project-clip-iut.html', t='Promo IUT', l=['Promo', 'IUT'], y='2025',
      type='Film promotionnel', typeEn='Promotional film', role='Tournage · montage', roleEn='Filming · editing',
      tools='Premiere Pro · After Effects',
      cover=W+'clip-iut.webp', hero=W+'clip-iut.webp',
      drive='https://drive.google.com/drive/folders/1wosbjYwwZGu4rO5vPrUjhOxTLO9FwnvR?usp=sharing',
      lede='Une vidéo promotionnelle pour présenter les formations, l’ambiance étudiante et les équipements de l’IUT.',
      ledeEn='A promotional video presenting the IUT’s courses, student life and equipment.',
      body='Prises de vue dynamiques sur le campus et montage rythmé pour garder l’énergie réelle des lieux.',
      bodyEn='Dynamic shots around the campus and a punchy edit to keep the real energy of the place.',
      facts=[('Format', 'Format', '16:9 · 1080p', '16:9 · 1080p'), ('Contexte', 'Context', 'Projet pour l’IUT', 'Made for the IUT')],
      credits=[], gallery=[], square=False),
 dict(slug='hypnose', file='project-soirée-hypnose.html', t='Hypnose', l=['Nuit de', 'Hypnose'], y='2025',
      type='Identité visuelle', typeEn='Visual identity', role='Direction artistique', roleEn='Art direction',
      tools='Photoshop · Illustrator',
      cover=W+'hypnose-logo.webp', hero=W+'hypnose-abribus.webp',
      drive='https://drive.google.com/drive/folders/1QUyTnsNlbGt9PZnmZIM2adnVZ34ZBbhN?usp=sharing',
      lede='L’identité visuelle de la deuxième Nuit de l’Hypnose à Lens, une soirée organisée au profit d’une association caritative.',
      ledeEn='The visual identity for the second Nuit de l’Hypnose in Lens, an evening held for a charity.',
      body='Une palette nocturne et dorée, des typographies franches, déclinées sur les affiches, les réseaux sociaux et la billetterie.',
      bodyEn='A night-and-gold palette and bold type, rolled out across posters, social media and ticketing.',
      facts=[('Supports', 'Deliverables', 'Affiche, réseaux, billets', 'Poster, social, tickets'), ('Contexte', 'Context', 'Événement caritatif', 'Charity event')],
      credits=[], gallery=[W+'hypnose-logo.webp', W+'hypnose-abribus.webp'], square=False),
 dict(slug='karting', file='project-karting.html', t='Karting', l=['Kar', 'Ting'], y='2026',
      type='Photographie', typeEn='Photography', role='Prise de vue · retouche', roleEn='Shooting · retouching',
      tools='Canon EOS 2000D · Tamron 70-300 · Lightroom',
      cover=W+'Karting/MG_2640.webp', hero=W+'Karting/MG_2640.webp', drive=DRIVE,
      lede='Une série sur la vitesse et la précision du pilotage, sur un circuit de karting.',
      ledeEn='A series on speed and precise driving, at a karting track.',
      body='Des vitesses d’obturation rapides pour figer les trajectoires et les regards sous la visière, puis un développement contrasté.',
      bodyEn='Fast shutter speeds to freeze the lines and the eyes behind the visor, then a contrasty grade.',
      facts=[('Discipline', 'Discipline', 'Sport mécanique', 'Motorsport'), ('Contexte', 'Context', 'Projet personnel', 'Personal project')],
      credits=[], gallery=[W+'Karting/'+n+'.webp' for n in ('MG_2640', 'MG_2683', 'MG_2772', 'MG_2775', 'MG_2875', 'MG_2877', 'MG_2909', 'MG_3016')], square=False),
 dict(slug='portrait', file='project-portrait.html', t='Portrait', l=['Por', 'Trait'], y='2026',
      type='Photographie', typeEn='Photography', role='Portrait · lumière naturelle', roleEn='Portrait · natural light',
      tools='Sony a6400 · Lightroom',
      cover=W+'Portrait/_DSC2219.webp', hero=W+'Portrait/_DSC2310.webp',
      drive='https://drive.google.com/drive/folders/1Z4nb9KyCcU23npnfQVRuB-szeqSG-oW4?usp=sharing',
      lede='Une séance portrait en extérieur, en lumière naturelle, autour des expressions et de la ville.',
      ledeEn='An outdoor portrait session in natural light, about expressions and the city.',
      body='Profondeur de champ courte, carnations travaillées avec douceur et compositions guidées par les lignes de l’architecture.',
      bodyEn='Shallow depth of field, gently graded skin tones and compositions led by the lines of the architecture.',
      facts=[('Style', 'Style', 'Portrait urbain', 'Urban portrait'), ('Contexte', 'Context', 'Projet personnel', 'Personal project')],
      credits=[], gallery=[W+'Portrait/'+n+'.webp' for n in ('_DSC2219', '_DSC2230', '_DSC2293', '_DSC2301', '_DSC2310', '_DSC2328')], square=False),
 dict(slug='live', file='project-fete-musique.html', t='Live', l=['Fête', 'Musique'], y='2026',
      type='Reportage concert', typeEn='Concert coverage', role='Photo live', roleEn='Live photography',
      tools='Sony a6400 · 16-50 / 55-210 · Lightroom',
      cover=W+'FeteMusique/_DSC1709.webp', hero=W+'FeteMusique/_DSC1709.webp',
      drive='https://drive.google.com/drive/folders/1zxyOmDzC-y2bO-iOu_rosfh4_tvkfazA?usp=sharing',
      lede='Un reportage photo sur les scènes de la Fête de la Musique à Arras.',
      ledeEn='A photo report from the stages of the Fête de la Musique in Arras.',
      body='Des éclairages de scène qui changent sans arrêt, des plans larges sur le public et des gros plans sur les musiciens.',
      bodyEn='Stage lighting that never stops changing, wide shots of the crowd and close-ups of the musicians.',
      facts=[('Lieu', 'Place', 'Arras', 'Arras'), ('Contexte', 'Context', 'Concert live', 'Live concert')],
      credits=[], gallery=[W+'FeteMusique/'+n+'.webp' for n in ('_DSC1709', '_DSC0573', '_DSC0784', '_DSC1177', '_DSC1189', '_DSC1235', '_DSC1392')], square=False),
 dict(slug='feline', file='project-photo.html', t='Féline', l=['Fé', 'Line'], y='2026',
      type='Photographie', typeEn='Photography', role='Série nature', roleEn='Nature series',
      tools='Canon EOS 2000D · 18-55 · Lightroom',
      cover=W+'Chat/IMG_0940.webp', hero=W+'Chat/IMG_0953.webp',
      drive='https://drive.google.com/drive/folders/1cmfNILqTtvfYmbDNQDQy3fWAzEi6zuSA?usp=sharing',
      lede='Une série en extérieur autour du regard et de l’attitude d’un chat.',
      ledeEn='An outdoor series about a cat’s gaze and attitude.',
      body='Lumière rasante naturelle et mise au point sur le regard, pour faire ressortir les détails du pelage.',
      bodyEn='Low natural light and focus on the eyes, to bring out the detail of the fur.',
      facts=[('Genre', 'Genre', 'Animalier', 'Animal'), ('Contexte', 'Context', 'Projet personnel', 'Personal project')],
      credits=[], gallery=[W+'Chat/'+n+'.webp' for n in ('IMG_0940', 'IMG_0947', 'IMG_0953', 'IMG_0954', 'IMG_0959', 'IMG_0967')], square=False),
]

# ---------------------------------------------------------------- shared pieces
def head(title, title_en, desc, base, extra_head='', via=False):
    via_js = ("try{if(sessionStorage.getItem('via')==='strip'){document.documentElement.classList.add('via-strip');sessionStorage.removeItem('via')}}catch(e){}" if via else '')
    return f'''<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(title)}</title>
<meta name="title-en" content="{e(title_en)}">
<meta name="description" content="{e(desc)}">
<meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(desc)}">
<meta property="og:image" content="https://alexiscarpentier.com/images/clip-loop-poster.jpg">
<meta name="theme-color" content="#141414">
<link rel="icon" href="{base}images/Logo_emblematique-03.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="{FONTS}">
<link rel="stylesheet" href="{base}styles.css?v={V}">
<script>document.documentElement.classList.add('js');try{{if(sessionStorage.getItem('curtain')){{document.documentElement.classList.add('cover')}}}}catch(e){{}}{via_js}</script>
{extra_head}</head>
'''

def header(base, current, ruler=None):
    def cur(k):
        return ' aria-current="page"' if k == current else ''
    r = ''
    if ruler:
        r = f'''  <div class="ruler cap" aria-hidden="true">
    <div class="ticks" id="tL">{ruler[0]}</div><span id="cur">{ruler[1]}</span><span class="box"></span><span id="tot">{ruler[2]}</span><div class="ticks" id="tR">{ruler[3]}</div>
  </div>
'''
    else:
        r = '  <span></span>\n'
    return f'''<a class="skip" href="#main"{en('Aller au contenu')}>Aller au contenu</a>
<header class="hdr cap">
  <a class="logo" href="{base}index.html" aria-label="Alexis Carpentier, accueil" data-en-label="Alexis Carpentier, home">Alexis</a>
{r}  <nav class="nav" aria-label="Navigation principale" data-en-label="Main navigation">
    <a href="{base}index.html"{cur('home')}{en('Projects')}>Projets</a>
    <a href="{base}about.html"{cur('about')}{en('About')}>À propos</a>
    <a href="{base}index.html#contact"{en('Contact')}>Contact</a>
    <button class="lang" type="button">EN</button>
  </nav>
</header>
'''

def footer(base, cls=''):
    return f'''<footer class="ftr cap {cls}">
  <span>© 2026 Alexis Carpentier</span>
  <span{en('Lens / Lille — remote across France')}>Lens / Lille — remote partout en France</span>
  <nav aria-label="Liens" data-en-label="Links"><a href="mailto:{MAIL}">Email</a><a href="{INSTA}" rel="noopener">Instagram</a><a href="{base}CV.pdf" download{en('Resume')}>CV</a><a href="{DRIVE}" rel="noopener">Drive</a></nav>
</footer>
<div class="curtain" aria-hidden="true"></div>
'''

ICON_X = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M3 3l10 10M13 3 3 13"/></svg>'
ICON_UP = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M8 13V3M3.5 7.5 8 3l4.5 4.5"/></svg>'
ICON_DOWN = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M8 3v10M3.5 8.5 8 13l4.5-4.5"/></svg>'
ICON_OUT = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M6 3h7v7M13 3 3 13"/></svg>'

def letters(txt):
    out = []
    for i, c in enumerate(txt):
        out.append('<span>&nbsp;</span>' if c == ' ' else f'<span><em style="transition-delay:{i*40}ms">{e(c)}</em></span>')
    return ''.join(out)

def ticks(n, i):
    half = (n + 1) // 2
    on = ' class="on"'
    L = ''.join('<i' + (on if k == i else '') + '></i>' for k in range(half))
    R = ''.join('<i' + (on if k == i else '') + '></i>' for k in range(half, n))
    return L, R

def write(rel, text):
    p = os.path.join(ROOT, rel)
    with open(p, 'w', encoding='utf-8') as f:
        f.write(text)
    print('wrote', rel)

# ---------------------------------------------------------------- home
def home():
    data = [dict(slug=p['slug'], t=p['t'], l=p['l'], y=p['y'], type=p['type'], typeEn=p['typeEn'], role=p['role'], roleEn=p['roleEn'],
                 tools=p['tools'], cover=p['cover'], hero=p['hero'], url='projects/' + p['file'],
                 **({'video': p['strip_video'], 'poster': p['strip_poster']} if p.get('strip_video') else {}))
            for p in PROJECTS]
    n = len(PROJECTS)
    s = head('Alexis Carpentier — monteur vidéo & motion designer', 'Alexis Carpentier — video editor & motion designer',
             'Portfolio d’Alexis Carpentier : clips, edits en motion design et photo, montés au rythme de la musique. Étudiant, Lens / Lille.', '')
    s += '<body class="dark">\n' + header('', 'home', ('', '01', f'{n:02d}', '')) + f'''
<main id="main">
  <section class="home" id="home" aria-label="Projets" data-en-label="Projects">
    <div class="stage">
      <div class="big" id="big" aria-hidden="true"></div>
      <div class="track" id="track" role="list"></div>
      <h1 class="who"><span{en('Alexis Carpentier — video editor &amp; motion designer')}>Alexis Carpentier — monteur vidéo &amp; motion designer</span><small{en('I cut your music videos to the beat, from the shoot to the grade. Student, Lens / Lille.')}>Je monte tes clips au rythme de la musique, du tournage à l’étalonnage. Étudiant, Lens / Lille.</small></h1>
      <dl class="pinfo cap" id="pinfo" aria-live="polite">
        <div><dt{en('No.')}>N°</dt><dd id="iN"></dd></div>
        <div><dt{en('Project')}>Projet</dt><dd id="iT"></dd></div>
        <div><dt>Type</dt><dd id="iType"></dd></div>
        <div><dt{en('Role')}>Rôle</dt><dd id="iRole"></dd></div>
        <div><dt{en('Year')}>Année</dt><dd id="iY"></dd></div>
      </dl>
      <p class="hint cap"{en('Scroll or swipe through the projects · click to open')}>Fais défiler les projets · clique pour ouvrir</p>
    </div>
  </section>

  <section class="journey" id="contact" aria-label="Contact">
    <div class="jstage">
      <p class="jtitle cap" id="jt"{en('Every project leads here')}>Tous les projets mènent ici</p>
      <canvas id="gl" aria-hidden="true"></canvas>
      <div class="contact" id="ct">
        <h2 class="l"{en('Shall we work<br>together?')}>On travaille<br>ensemble ?</h2>
        <p class="sub"{en('Music video, edit, event video or photo series: write to me, I reply by email or DM.')}>Clip, edit, vidéo d’événement ou série photo : écris-moi, je réponds par mail ou en DM.</p>
        <div class="row cap">
          <a class="btn solid" href="mailto:{MAIL}">{MAIL}</a>
          <a class="btn" href="{INSTA}" rel="noopener">Instagram @crpt.alexis</a>
        </div>
      </div>
    </div>
  </section>
</main>
''' + footer('', 'home-ftr') + f'''
<div class="view vw" id="view" aria-hidden="true">
  <div class="vside"><img id="vSide" src="{PROJECTS[1]['cover']}" alt=""></div>
  <div class="vmedia" id="vMedia"></div>
  <div class="vbig" id="vBig"></div>
  <dl class="vmeta cap">
    <div><dt{en('A — Year')}>A — Année</dt><dd id="vY"></dd></div>
    <div><dt>B — Type</dt><dd id="vType"></dd></div>
    <div><dt{en('C — Role')}>C — Rôle</dt><dd id="vRole"></dd></div>
    <div><dt{en('D — Tools')}>D — Outils</dt><dd id="vTools"></dd></div>
    <div class="vbtns"><span class="btn">{ICON_X}<span{en('Close')}>Fermer</span></span><span class="btn solid"{en('Explore the project')}>Explorer le projet</span></div>
  </dl>
</div>
<script>window.PROJECTS={json.dumps(data, ensure_ascii=False)};</script>
<script src="{THREE}" defer></script>
<script src="summit.js?v={V}" defer></script>
<script src="script.js?v={V}" defer></script>
</body>
</html>
'''
    write('index.html', s)

# ---------------------------------------------------------------- project pages
def project(i):
    p = PROJECTS[i]; n = len(PROJECTS)
    nxt = PROJECTS[(i + 1) % n]; prv = PROJECTS[(i - 1) % n]
    b = '../'
    L, R = ticks(n, i)
    s = head(f"{p['t']} — Alexis Carpentier", f"{p['t']} — Alexis Carpentier", f"{p['t']} : {p['type'].lower()}, {p['y']}. {p['lede']}", b, via=True)
    if p.get('video'):
        media = f'<video autoplay muted loop playsinline poster="{b}{p["poster"]}"><source src="{b}{p["video"]}" type="video/mp4"></video>'
    else:
        media = f'<img src="{b}{p["hero"]}" alt="{e(p["t"])}">'
    big = ''.join(f'<div class="ln">{letters(w)}</div>' for w in p['l'])
    facts = [('Année', 'Year', p['y'], p['y']), ('Type', 'Type', p['type'], p['typeEn']), ('Rôle', 'Role', p['role'], p['roleEn']),
             ('Outils', 'Tools', p['tools'], p['tools'])] + p['facts']
    facts_html = ''.join(f'<div><dt class="cap"{en(ke)}>{e(kf)}</dt><dd{en(ve) if ve != vf else ""}>{e(vf)}</dd></div>' for kf, ke, vf, ve in facts)
    credits = ''
    if p['credits']:
        credits = '<p class="credits">' + '<br>'.join(f'<b{en(ke)}>{e(kf)}</b> — {e(names)}' for kf, ke, names in p['credits']) + '</p>'
    reel = ''
    if p.get('video'):
        reel = f'''    <figure class="reel{' square' if p['square'] else ''}" data-reveal>
      <video autoplay muted loop playsinline preload="metadata" poster="{b}{p['poster']}"><source src="{b}{p['video']}" type="video/mp4"></video>
      <figcaption class="cap"{en('Excerpt — muted, the full version is on the Drive')}>Extrait — muet, la version complète est sur le Drive</figcaption>
    </figure>
'''
    gal = ''
    if p['gallery']:
        cls = 'gallery solo' if len(p['gallery']) < 3 else 'gallery'
        gal = f'    <div class="{cls}">\n' + ''.join(
            f'      <figure data-reveal><img src="{b}{g}" alt="{e(p["t"])} — {k+1:02d}" loading="lazy" decoding="async"></figure>\n' for k, g in enumerate(p['gallery'])) + '    </div>\n'
    drive_fr = 'La version complète et les fichiers en haute définition sont sur le Drive.' if p.get('video') or i == 2 else 'La série complète en haute définition est sur le Drive.'
    drive_en = 'The full version and the high-resolution files are on the Drive.' if p.get('video') or i == 2 else 'The full series in high resolution is on the Drive.'
    if p['slug'] == 'hypnose':
        drive_fr, drive_en = 'Tous les supports de l’identité sont sur le Drive.', 'Every piece of the identity is on the Drive.'
    s += f'''<body class="light">
{header(b, 'project', (L, f'{i+1:02d}', f'{n:02d}', R))}
<main id="main">
  <section class="phero vw" aria-labelledby="ptitle">
    <h1 class="sr" id="ptitle">{e(p['t'])} — {e(p['type'])}</h1>
    <a class="vside" href="{nxt['file']}" aria-label="Projet suivant : {e(nxt['t'])}" data-en-label="Next project: {e(nxt['t'])}"><img src="{b}{nxt['cover']}" alt=""></a>
    <div class="vmedia">{media}</div>
    <div class="vbig" aria-hidden="true">{big}</div>
    <nav class="vnav" aria-label="Projets voisins" data-en-label="Neighbouring projects">
      <a href="{prv['file']}" data-prev aria-label="Projet précédent : {e(prv['t'])}" data-en-label="Previous project: {e(prv['t'])}">{ICON_UP}</a>
      <a href="{nxt['file']}" data-next aria-label="Projet suivant : {e(nxt['t'])}" data-en-label="Next project: {e(nxt['t'])}">{ICON_DOWN}</a>
    </nav>
    <dl class="vmeta cap">
      <div><dt{en('A — Year')}>A — Année</dt><dd>{p['y']}</dd></div>
      <div><dt>B — Type</dt><dd{en(p['typeEn'])}>{e(p['type'])}</dd></div>
      <div><dt{en('C — Role')}>C — Rôle</dt><dd{en(p['roleEn'])}>{e(p['role'])}</dd></div>
      <div><dt{en('D — Tools')}>D — Outils</dt><dd>{e(p['tools'])}</dd></div>
      <div class="vbtns">
        <a class="btn" href="{b}index.html" data-back="{p['slug']}">{ICON_X}<span{en('Close')}>Fermer</span></a>
        <a class="btn solid" href="#detail"{en('Explore the project')}>Explorer le projet</a>
      </div>
    </dl>
  </section>

  <div class="pbody" id="detail">
    <section class="pintro">
      <h2 class="cap"{en('The project')}>Le projet</h2>
      <p class="lede"{en(p['ledeEn'])}>{e(p['lede'])}</p>
      <p{en(p['bodyEn'])}>{e(p['body'])}</p>
      <dl class="facts">{facts_html}</dl>
      {credits}
    </section>
{reel}{gal}    <section class="drive">
      <p{en(drive_en)}>{e(drive_fr)}</p>
      <div class="row cap"><a class="btn solid" href="{p['drive']}" target="_blank" rel="noopener"><span{en('Open the Drive folder')}>Ouvrir le dossier Drive</span>{ICON_OUT}</a></div>
    </section>
    <a class="pnext" href="{nxt['file']}">
      <span class="cap"{en('Next project')}>Projet suivant</span>
      <span class="t">{e(nxt['t'])}</span>
      <img src="{b}{nxt['cover']}" alt="" loading="lazy">
    </a>
  </div>
</main>
{footer(b)}<script src="{b}script.js?v={V}" defer></script>
</body>
</html>
'''
    write('projects/' + p['file'], s)

def astro():
    b = '../'
    s = head('Astrophotographie — Alexis Carpentier', 'Astrophotography — Alexis Carpentier', 'Série d’astrophotographie : ciels nocturnes et poses longues.', b)
    s += f'''<body class="dark">
{header(b, 'project')}
<main id="main" class="about">
  <div class="ahead">
    <h1><span><em{en('Astro')}>Astro</em></span><span><em{en('photography')}>photographie</em></span></h1>
    <p class="side cap"{en('Photography · 2026')}>Photographie · 2026</p>
  </div>
  <div class="agrid">
    <div class="acopy" style="grid-column:1 / span 8">
      <p class="lede"{en('A series on night skies, constellations and landscapes under the stars.')}>Une série sur les ciels nocturnes, les constellations et les paysages sous les étoiles.</p>
      <p{en('Long exposures on a tripod, manual focus at infinity and a careful noise-aware development. The photos are on the Drive.')}>Poses longues sur trépied, mise au point manuelle à l’infini et développement attentif au bruit. Les photos sont sur le Drive.</p>
      <dl class="ainfo"><div><dt class="cap"{en('Tools')}>Outils</dt><dd>Sony a6400 · Lightroom</dd></div><div><dt class="cap"{en('Year')}>Année</dt><dd>2026</dd></div></dl>
      <div class="acta cap"><a class="btn solid" href="{DRIVE}" target="_blank" rel="noopener"><span{en('Open the Drive folder')}>Ouvrir le dossier Drive</span>{ICON_OUT}</a><a class="btn" href="{b}index.html"{en('Back to the projects')}>Retour aux projets</a></div>
    </div>
  </div>
</main>
<div style="height:120px"></div>
{footer(b)}<script src="{b}script.js?v={V}" defer></script>
</body>
</html>
'''
    write('projects/project-astrophoto.html', s)

# ---------------------------------------------------------------- about
def about():
    s = head('À propos — Alexis Carpentier', 'About — Alexis Carpentier', 'Alexis Carpentier, étudiant : montage vidéo, motion design, étalonnage et photo, à Lens / Lille.', '')
    disc = [
      ('Montage', 'Editing', 'Le cœur de ce que je fais : construire le rythme d’une vidéo à partir de sa musique, couper sur le son.', 'The heart of what I do: building a video’s rhythm from its music, cutting on the sound.'),
      ('Motion design', 'Motion design', 'Typographie animée, formes et transitions dans After Effects, toujours calées sur le tempo.', 'Kinetic type, shapes and transitions in After Effects, always timed to the beat.'),
      ('Étalonnage', 'Colour grading', 'Harmoniser les plans et donner une couleur à l’image, y compris depuis des rushes en S-Log.', 'Matching shots and giving the picture a look, including from S-Log footage.'),
      ('Photo & identité', 'Photo & identity', 'Concerts, circuits, portraits, et des identités visuelles pour des événements.', 'Concerts, race tracks, portraits, and visual identities for events.'),
    ]
    steps = [
      ('Écoute', 'Listening', 'On part du morceau ou du message : ce que la vidéo doit faire ressentir, et où.', 'We start from the track or the message: what the video should make people feel, and where.'),
      ('Tournage', 'Shoot', 'Je filme ou je photographie moi-même quand il le faut, avec mon matériel.', 'I film or photograph myself when needed, with my own gear.'),
      ('Montage', 'Edit', 'Une première version calée sur le son, qu’on ajuste ensemble.', 'A first cut timed to the sound, which we adjust together.'),
      ('Finitions', 'Finishing', 'Motion, étalonnage et exports aux formats dont tu as besoin.', 'Motion, grading and exports in the formats you need.'),
    ]
    tools = [('Premiere Pro', 'Montage', 'Editing'), ('After Effects', 'Motion design', 'Motion design'), ('Photoshop', 'Retouche, affiches', 'Retouching, posters'),
             ('Lightroom', 'Développement photo', 'Photo development'), ('Illustrator', 'Identité visuelle', 'Visual identity')]
    gear = [('Sony Alpha 6400', '16-50 mm · 55-210 mm · S-Log', '16-50 mm · 55-210 mm · S-Log'), ('Canon EOS 2000D', '18-55 mm · Tamron 70-300 mm', '18-55 mm · Tamron 70-300 mm')]
    li = ''.join(f'<li data-reveal><span class="n cap">{k+1:02d}</span><h3{en(te)}>{e(tf)}</h3><p{en(de)}>{e(df)}</p></li>' for k, (tf, te, df, de) in enumerate(disc))
    st = ''.join(f'<li data-reveal><span class="n cap">{k+1:02d}</span><h3{en(te)}>{e(tf)}</h3><p{en(de)}>{e(df)}</p></li>' for k, (tf, te, df, de) in enumerate(steps))
    tl = ''.join(f'<li><span>{e(t)}</span><span{en(ue)}>{e(uf)}</span></li>' for t, uf, ue in tools)
    gl = ''.join(f'<li><span>{e(t)}</span><span{en(ue) if ue != uf else ""}>{e(uf)}</span></li>' for t, uf, ue in gear)
    s += f'''<body class="dark">
{header('', 'about')}
<main id="main" class="about">
  <div class="ahead">
    <h1><span><em{en('About')}>À propos</em></span></h1>
    <p class="side cap"{en('Video editing · motion design · grading · photo')}>Montage · motion design · étalonnage · photo</p>
  </div>
  <div class="agrid">
    <figure class="aphoto"><img src="images/work/alexis-portrait.webp" alt="Portrait d’Alexis Carpentier" width="904" height="1600"></figure>
    <div class="acopy">
      <p class="lede"{en('I’m Alexis Carpentier. I’m a student, I edit music videos and films to the rhythm of the music, and I photograph what moves: concerts, race tracks, people.')}>Je m’appelle Alexis Carpentier. Je suis étudiant, je monte des clips et des vidéos au rythme de la musique, et je photographie ce qui bouge : concerts, circuits, portraits.</p>
      <p{en('Two things define how I work. The edit is built on the sound: cuts, transitions and motion land on the track. And I can carry a project from start to finish on my own, from the shoot to the edit, motion, grade and visual identity.')}>Deux choses définissent ma façon de travailler. Le montage se construit sur le son : les coupes, les transitions et le motion tombent sur le morceau. Et je peux porter un projet seul du début à la fin, du tournage au montage, au motion, à l’étalonnage et à l’identité visuelle.</p>
      <dl class="ainfo">
        <div><dt class="cap"{en('Based in')}>Basé à</dt><dd{en('Lens / Lille — remote across France')}>Lens / Lille — à distance partout en France</dd></div>
        <div><dt class="cap"{en('Status')}>Statut</dt><dd{en('Student, open to freelance work')}>Étudiant, disponible pour des projets freelance</dd></div>
        <div><dt class="cap"{en('Languages')}>Langues</dt><dd{en('French, English')}>Français, anglais</dd></div>
        <div><dt class="cap">Contact</dt><dd><a href="mailto:{MAIL}">{MAIL}</a></dd></div>
      </dl>
      <div class="acta cap">
        <a class="btn solid" href="index.html#contact"{en('Start a project')}>Lancer un projet</a>
        <a class="btn" href="CV.pdf" download{en('Download the resume')}>Télécharger le CV</a>
        <a class="btn" href="{INSTA}" rel="noopener">Instagram</a>
      </div>

      <section class="asec"><h2 class="cap"{en('What I do')}>Ce que je fais</h2><ul class="alist">{li}</ul></section>
      <section class="asec"><h2 class="cap"{en('How we work together')}>Comment on travaille</h2><ul class="alist">{st}</ul></section>
      <section class="asec"><h2 class="cap"{en('Software')}>Logiciels</h2><ul class="tools">{tl}</ul></section>
      <section class="asec"><h2 class="cap"{en('Gear')}>Matériel</h2><ul class="tools">{gl}</ul></section>
    </div>
  </div>
  <div style="height:140px"></div>
</main>
{footer('')}<script src="script.js?v={V}" defer></script>
</body>
</html>
'''
    write('about.html', s)

def redirect(name, target, label):
    s = f'''<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(label)} — Alexis Carpentier</title>
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url={target}">
<link rel="canonical" href="https://alexiscarpentier.com/{target}">
<script>location.replace('{target}' + location.search)</script>
</head>
<body style="background:#141414;color:#e9e6df;font-family:system-ui,sans-serif;padding:40px">
<p><a href="{target}" style="color:inherit">{e(label)} → alexiscarpentier.com</a></p>
</body>
</html>
'''
    write(name, s)

if __name__ == '__main__':
    home(); about(); astro()
    for i in range(len(PROJECTS)):
        project(i)
    redirect('projects.html', 'index.html', 'Projets')
    redirect('expertise.html', 'about.html', 'Expertise')
    redirect('contact.html', 'index.html#contact', 'Contact')
