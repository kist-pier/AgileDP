# AgileDP — project page

Project page for **AgileDP: Quantizing Diffusion Policy via Dynamic Scaling and
Reweighted Distillation** (CoRL 2026).

Jiyeon Joung, Seungseop Lee, Namyoon Kim, Keunwoo Jang† —
[PIER Lab](https://pier-lab.kr/), Korea Institute of Science and Technology (KIST).
† corresponding author.

## URLs

The kist-pier org serves Pages through the custom domain, so this page has two
addresses and both work:

| Address | Use it for |
| --- | --- |
| <https://kist-pier.github.io/AgileDP/> | the citation in the paper |
| <https://pier-lab.kr/AgileDP/> | slides, talks, social posts |

Cite the `github.io` form. It redirects to the branded domain today and keeps
working if the custom domain ever lapses; the reverse is not true. Whichever you
pick, freeze it before the camera-ready.

## Layout

```
index.html                  the whole page; one file, no build step
static/css/index.css        design tokens + layout
static/js/index.js          side nav, task switcher, W4A4/W8A8 toggle
static/images/              figures (cropped from the submission PDF)
static/videos/              rollout clips — all placeholders right now
.nojekyll                   serve files verbatim, skip Jekyll
```

## Editing

**Videos.** Every clip under `static/videos/` is a generated placeholder that says
so on screen. Overwrite a file in place, keep its name, and the page picks it up
with no HTML change. Keep clips short, muted and H.264 so they autoplay
everywhere:

```bash
ffmpeg -i raw.mp4 -vf "scale=640:-2" -c:v libx264 -pix_fmt yuv420p \
  -crf 26 -movflags +faststart -an static/videos/sim_lift.mp4
```

**Figures.** `static/images/*.png` were cropped out of the submission PDF at
300 dpi. Replace them with camera-ready exports when those exist.

**Links.** The four hero buttons (arXiv, Paper, Code, Video) are placeholders:
set each `href` and remove `class="is-disabled"`. The `TODO` comment at the top
of `index.html` lists everything still outstanding.

**Numbers.** Tables 1, 2 and 3 of the paper are transcribed into `index.html`.
Update them there if the camera-ready numbers change.

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deployment

GitHub Pages serves `main` at the repository root. Pushing to `main` publishes;
a build takes about a minute.
