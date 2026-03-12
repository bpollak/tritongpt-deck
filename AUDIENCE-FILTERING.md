# Audience-Based Slide Filtering

This presentation supports filtering slides based on different audience types using URL parameters.

## Usage

Add the `?audience=<type>` parameter to the URL to filter slides:

### Available Audience Types

- **all** (default) - Shows slides tagged for the default deck
- **technical** - Shows slides tagged for technical audiences
- **executive** - Shows slides tagged for executive audiences
- **internal** - Shows slides tagged for internal UC San Diego audiences
- **public** - Shows slides tagged for public/external audiences
- **CCW** - Shows slides tagged for the CCW audience

### Examples

- All slides (default): `https://tritongpt-deck.vercel.app/`
- Technical audience: `https://tritongpt-deck.vercel.app/?audience=technical`
- Executive audience: `https://tritongpt-deck.vercel.app/?audience=executive`
- Internal audience: `https://tritongpt-deck.vercel.app/?audience=internal`
- CCW audience: `https://tritongpt-deck.vercel.app/?audience=CCW`

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
Slides tagged with `"all"` appear in the default deck at `/`; they are not automatically included in every audience-filtered view.

## Modifying Slide Visibility

To change which slides appear for different audiences:

1. Open `src/data/slides.js`
2. Find the slide you want to modify
3. Update the `audiences` array with the appropriate audience types
4. Add `"all"` only when the slide should appear in the default deck
