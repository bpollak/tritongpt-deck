# Audience-Based Slide Filtering

This presentation supports filtering slides based on different audience types using URL parameters.

## Usage

Add the `?audience=<type>` parameter to the URL to filter slides:

### Available Audience Types

- **all** (default) - Shows all slides
- **technical** - Shows slides tagged for technical audiences
- **executive** - Shows slides tagged for executive audiences
- **internal** - Shows slides tagged for internal UC San Diego audiences
- **public** - Shows slides tagged for public/external audiences

### Examples

- All slides (default): `https://tritongpt-deck.vercel.app/`
- Technical audience: `https://tritongpt-deck.vercel.app/?audience=technical`
- Executive audience: `https://tritongpt-deck.vercel.app/?audience=executive`
- Internal audience: `https://tritongpt-deck.vercel.app/?audience=internal`

## How It Works

Each slide in `src/data/slides.js` has an `audiences` array that defines which audience types can view it:

```javascript
{
  "id": 1,
  "title": "My Slide",
  "audiences": ["all", "technical", "internal"]
}
```

When a URL parameter is provided, only slides that include that audience type in their `audiences` array will be shown.

## Modifying Slide Visibility

To change which slides appear for different audiences:

1. Open `src/data/slides.js`
2. Find the slide you want to modify
3. Update the `audiences` array with the appropriate audience types
4. Slides tagged with `"all"` will appear for all audience types

## Current Slide Tagging

- **Slides 1-16, 19-20, 22, 24**: Tagged as `["all"]` - visible to all audiences
- **Slides 17, 21**: Tagged as `["all", "technical"]` - visible to all audiences, but particularly relevant for technical audiences
- **Slide 18**: Tagged as `["all", "executive", "internal"]` - problem statement slide relevant for executives and internal audiences
- **Slide 23**: Tagged as `["all", "internal"]` - roadmap slide with internal planning details
