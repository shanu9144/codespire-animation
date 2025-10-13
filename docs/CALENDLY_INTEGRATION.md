# Calendly Integration Guide

## Overview
The CodeSpire website now includes a dedicated demo scheduling page with Calendly integration. All "Schedule a Demo" buttons throughout the site now redirect to `/schedule-demo`.

## Current Implementation

### Files Modified
- **New Page**: `/src/app/schedule-demo/page.js` - Main demo scheduling page
- **New Component**: `/src/components/ui/CalendlyWidget.js` - Reusable Calendly widget component
- **Updated Components**: All "Schedule a Demo" buttons now link to `/schedule-demo` instead of `/contact`

### Components Updated
- `Header.js` (desktop and mobile buttons)
- `HeroWithScrollAnimations.js`
- `HeroWithLiquid.js`
- `HeroFallback.js`
- `FinalCTABanner.js`
- `Hero.js`

## How to Add Your Calendly URL

### Step 1: Get Your Calendly URL
1. Log in to your Calendly account
2. Go to your event type settings
3. Copy the public URL (e.g., `https://calendly.com/your-company/demo`)

### Step 2: Update the Code
In `/src/app/schedule-demo/page.js`, replace this line:
```javascript
const calendlyUrl = null; // Example: "https://calendly.com/your-company/demo"
```

With your actual Calendly URL:
```javascript
const calendlyUrl = "https://calendly.com/your-company/demo";
```

### Step 3: Test the Integration
1. Start the development server: `npm run dev`
2. Navigate to any page with a "Schedule a Demo" button
3. Click the button to go to `/schedule-demo`
4. Verify the Calendly widget loads correctly

## Features

### Demo Scheduling Page
- **Responsive Design**: Works on all devices
- **Animated UI**: Smooth transitions and hover effects
- **Benefits Section**: Highlights key demo features
- **Contact Fallback**: Alternative contact methods if needed
- **Professional Styling**: Matches the overall site design

### CalendlyWidget Component
- **Reusable**: Can be used anywhere in the app
- **Configurable**: Customizable height, width, and styling
- **Fallback UI**: Shows placeholder when no URL is provided
- **Auto-loading**: Automatically loads Calendly script when needed

## Customization Options

### Widget Styling
You can customize the Calendly widget appearance by modifying the `CalendlyWidget` component props:

```javascript
<CalendlyWidget 
  url={calendlyUrl}
  height="700px"        // Custom height
  minWidth="400px"      // Custom minimum width
  className="custom-class" // Additional CSS classes
/>
```

### Page Styling
The demo page uses Tailwind CSS classes that can be easily customized in `/src/app/schedule-demo/page.js`.

## Troubleshooting

### Widget Not Loading
1. Check that your Calendly URL is correct and publicly accessible
2. Ensure the Calendly event type is set to "Public"
3. Check browser console for any JavaScript errors

### Styling Issues
1. Verify Tailwind CSS is properly configured
2. Check for CSS conflicts in the global styles
3. Test on different screen sizes

## Future Enhancements

### Potential Improvements
- **Analytics Integration**: Track demo booking conversions
- **Pre-fill Forms**: Auto-populate user information
- **Multiple Event Types**: Support for different demo types
- **Custom Branding**: Match Calendly styling to site theme
- **Email Notifications**: Custom confirmation emails

### Advanced Features
- **Time Zone Detection**: Auto-detect user timezone
- **Availability Sync**: Real-time calendar availability
- **Follow-up Automation**: Automated post-demo workflows
- **Integration APIs**: Connect with CRM systems

## Support

If you encounter any issues with the Calendly integration:
1. Check the browser console for errors
2. Verify your Calendly account settings
3. Test with different browsers
4. Contact the development team for assistance

---

**Note**: This integration is ready to use once you provide your Calendly URL. The placeholder UI will automatically be replaced with the actual booking widget.

