# PDF Generator App

A Next.js + TypeScript application that allows users to collect their details through a form and generate/download PDFs.

## Features

- **Form Screen**: Collect user details with validation
- **PDF Preview Screen**: Preview the PDF layout before downloading
- **PDF Generation**: Generate and download PDFs with user data
- **Data Persistence**: Form data is preserved when navigating between screens
- **Responsive Design**: Works on desktop and mobile devices

## Form Fields

- **Name** (required)
- **Email** (required, valid format)
- **Phone Number** (required, minimum 10 digits)
- **Position** (optional)
- **Description** (optional, multiline)

## Validation Rules

- Name, Email, and Phone are required fields
- Email must be in a valid format
- Phone number must have at least 10 digits

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository or download the files
2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles with Tailwind CSS
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Main form page
│   └── preview/
│       └── page.tsx         # PDF preview page
├── components/
│   ├── UserForm.tsx         # Main form component
│   └── PDFPreview.tsx       # PDF preview component
├── types/
│   └── index.ts             # TypeScript type definitions
├── utils/
│   ├── validation.ts        # Form validation utilities
│   └── pdfGenerator.ts      # PDF generation utilities
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **@react-pdf/renderer**: PDF generation library
- **react-to-pdf**: Alternative PDF generation option

## Usage

1. **Fill out the form** on the main page with your details
2. **Click "View PDF"** to preview the PDF layout
3. **Click "Download PDF"** to generate and download the PDF file
4. **Use "Back" button** to return to the form with data intact

## Features

- ✅ Form validation with error messages
- ✅ Responsive design for mobile and desktop
- ✅ Data persistence between screens
- ✅ PDF generation and download
- ✅ Modern UI with Tailwind CSS
- ✅ TypeScript for type safety
- ✅ Loading states and error handling

## Browser Compatibility

This application works in all modern browsers that support:

- ES6+ JavaScript features
- CSS Grid and Flexbox
- File API for PDF downloads

## License

This project is created for educational purposes as a frontend internship assignment.
