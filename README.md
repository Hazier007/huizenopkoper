# Huizenopkoper.be

Real estate acquisition platform for Belgium.

## Features

- Property submission form with photo upload
- Province and city-specific landing pages
- Lead management system with Supabase
- Admin dashboard for lead viewing
- GDPR-compliant data handling

## Technology Stack

- **Framework**: Next.js 13 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Deployment**: Netlify

## Environment Variables

Create a `.env` file in the root directory with the following variables:

### Supabase Configuration

```env
# Public Supabase URL (safe to expose in client-side code)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url

# Public anonymous key (safe to expose in client-side code)
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Service role key (NEVER expose in client-side code!)
# Used for admin operations that bypass Row Level Security
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Admin Authentication

```env
# Admin dashboard credentials
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_password
```

### Getting Supabase Keys

1. Go to your Supabase project dashboard
2. Navigate to **Settings** > **API**
3. Copy the following values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

**Important**: Keep your service role key secure! It has full access to your database.

## Database Schema

### Tables

#### leads
Stores property submissions from potential sellers.

- **Fields**:
  - `id`: UUID primary key
  - `created_at`: Timestamp
  - `status`: Enum (new, qualified, sent, closed)
  - `property_type`: Property type
  - `address_street`, `address_number`: Street address (optional)
  - `postal_code`, `city`, `province`: Location
  - `living_area_m2`, `plot_area_m2`, `bedrooms`: Property specs (optional)
  - `condition`: Property condition (nieuw, goed, op te frissen, te renoveren)
  - `occupancy`: Occupancy status (vrij, verhuurd, te bespreken)
  - `timeline`: Sale timeline (asap, 1-3 maanden, 3-6 maanden, flexibel)
  - `asking_price_hint`: Indicative price (optional)
  - `description`: Additional notes (optional)
  - `contact_name`, `contact_email`, `contact_phone`: Contact info
  - `gdpr_consent`: GDPR consent flag
  - `source_page`: Submission source (optional)
  - `photos`: JSONB array with photo metadata

- **RLS Policies**:
  - Public INSERT (anonymous lead submission)
  - No public SELECT (admin-only via service role)

#### buyers
Stores information about property buyers (for future use).

- **Fields**:
  - `id`: UUID primary key
  - `created_at`: Timestamp
  - `company_name`, `contact_name`, `email`, `phone`: Contact info
  - `regions`: JSONB array of interested regions
  - `property_types`: JSONB array of interested property types
  - `is_active`: Active status

- **RLS Policies**: Admin-only access

#### lead_matches
Tracks matching between leads and buyers (for future use).

- **Fields**:
  - `id`: UUID primary key
  - `lead_id`: Foreign key to leads
  - `buyer_id`: Foreign key to buyers
  - `created_at`: Timestamp
  - `status`: Match status (sent, opened, interested, not_interested)

- **RLS Policies**: Admin-only access

### Storage

#### lead-photos bucket
- **Public**: No (private bucket)
- **File size limit**: 10MB per file
- **Allowed types**: image/jpeg, image/png, image/webp
- **Structure**: `{lead_id}/{timestamp}_{filename}`

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd huizenopkoper-be
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Fill in your Supabase credentials
   - Set admin username and password

4. **Database setup**
   - The migrations are already applied
   - Tables: `leads`, `buyers`, `lead_matches`
   - Storage bucket: `lead-photos`

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Main site: `http://localhost:3000`
   - Admin dashboard: `http://localhost:3000/admin`

## Admin Dashboard

Access the admin dashboard at `/admin` to view and manage leads.

**Default credentials** (change these in production!):
- Username: `admin`
- Password: Set via `ADMIN_PASSWORD` environment variable

### Features:
- View all submitted leads
- See detailed property information
- Contact details for each lead
- Lead status tracking
- Photo metadata viewing

## Deployment

### Netlify

1. Connect your repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Add environment variables in Netlify dashboard
4. Deploy

### Environment Variables in Production

Make sure to set all environment variables in your hosting platform:
- Netlify: Site settings > Environment variables
- Vercel: Project settings > Environment Variables

**Security Note**: Never commit `.env` files to version control!

## Security Considerations

1. **Service Role Key**: Keep this absolutely secret. It bypasses all RLS policies.
2. **Admin Password**: Use a strong password in production.
3. **HTTPS**: Always use HTTPS in production to protect data in transit.
4. **GDPR Compliance**: The system includes GDPR consent checkboxes. Ensure you have proper privacy policies in place.

## Data Privacy

This application processes personal data. Ensure compliance with:
- GDPR (General Data Protection Regulation)
- Belgian privacy laws
- Your own privacy policy (accessible at `/privacy`)

Personal data collected:
- Contact information (name, email, phone)
- Property address and details
- Photos of properties

## Support

For issues or questions, contact your development team.

## License

Proprietary - All rights reserved
