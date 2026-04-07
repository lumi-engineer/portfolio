# Testimonial avatars

Copy portrait PNGs here. Filenames must match exactly:

```
public/testimonials/avatars/
├── podia.png        → Sarah Chen · Podia
├── teachfloor.png   → Marcus Webb · Teachfloor
├── paw.png          → Elena Vasquez · Paw.com
├── whop.png         → Jordan Blake · Whop
├── branch.png       → Priya Nair · Branch Furniture
├── revenuecat.png   → David Okonkwo · RevenueCat
├── jow.png          → Amélie Laurent · Jow
└── studypool.png    → Ryan Torres · Studypool
```

## Tips

- **Format:** `.png` (or `.jpg` — update paths in `src/data/portfolio.ts` if needed)
- **Size:** square, at least **256×256** (displayed at 56×56; larger = sharper)
- **Crop:** face-centered headshots work best with the circular frame

No code changes needed after copying — paths are already wired in `portfolio.ts`.
