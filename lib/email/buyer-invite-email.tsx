import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface BuyerInviteEmailProps {
  companyName: string;
  contactName?: string;
  leadCity: string;
  leadProvince: string;
  propertyType: string;
  teaserSummary: string;
  leadCharacteristics: string[];
  tokenLink: string;
  creditsLink: string;
}

export default function BuyerInviteEmail({
  companyName,
  contactName,
  leadCity,
  leadProvince,
  propertyType,
  teaserSummary,
  leadCharacteristics,
  tokenLink,
  creditsLink,
}: BuyerInviteEmailProps) {
  const previewText = `Nieuwe exclusieve lead in ${leadCity} – ${propertyType}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Nieuwe Exclusieve Lead Beschikbaar</Heading>

          <Text style={greeting}>
            {contactName ? `Beste ${contactName}` : `Beste ${companyName}`},
          </Text>

          <Text style={text}>
            We hebben een nieuwe lead voor jou die perfect aansluit bij jullie zoekgebied.
          </Text>

          <Section style={teaserBox}>
            <Heading as="h2" style={h2}>
              {propertyType} in {leadCity}
            </Heading>
            <Text style={location}>
              📍 {leadCity}, {leadProvince}
            </Text>

            {leadCharacteristics.length > 0 && (
              <div>
                <Text style={characteristicsTitle}>Kenmerken:</Text>
                <ul style={characteristicsList}>
                  {leadCharacteristics.map((char, index) => (
                    <li key={index} style={characteristicsItem}>{char}</li>
                  ))}
                </ul>
              </div>
            )}

            {teaserSummary && (
              <Text style={summary}>{teaserSummary}</Text>
            )}
          </Section>

          <Text style={text}>
            <strong>Let op:</strong> Deze lead is exclusief beschikbaar voor geselecteerde inkopers.
            Wees er snel bij voordat een ander de kans grijpt!
          </Text>

          <Section style={buttonContainer}>
            <Button style={primaryButton} href={tokenLink}>
              Bekijk Teaser & Claim Lead
            </Button>
          </Section>

          <Section style={buttonContainer}>
            <Button style={secondaryButton} href={creditsLink}>
              Koop Extra Credits
            </Button>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Deze link is 7 dagen geldig. Na het activeren van je account via magic link login
            vervalt deze invite link automatisch.
          </Text>

          <Text style={footer}>
            <strong>Privacy:</strong> Deze teaser bevat geen contactgegevens of exacte adressen.
            Volledige informatie wordt zichtbaar na het claimen van de lead.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const h1 = {
  color: '#1f2937',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '40px 0 20px',
  padding: '0 40px',
};

const h2 = {
  color: '#1f2937',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 10px',
};

const greeting = {
  color: '#4b5563',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px',
  padding: '0 40px',
};

const text = {
  color: '#4b5563',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px',
  padding: '0 40px',
};

const teaserBox = {
  backgroundColor: '#f3f4f6',
  borderRadius: '8px',
  margin: '24px 40px',
  padding: '24px',
  border: '2px solid #e5e7eb',
};

const location = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '0 0 16px',
};

const characteristicsTitle = {
  color: '#374151',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '16px 0 8px',
};

const characteristicsList = {
  color: '#4b5563',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0 0 16px',
  paddingLeft: '20px',
};

const characteristicsItem = {
  marginBottom: '4px',
};

const summary = {
  color: '#4b5563',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '16px 0 0',
  fontStyle: 'italic',
};

const buttonContainer = {
  padding: '8px 40px',
};

const primaryButton = {
  backgroundColor: '#2563eb',
  borderRadius: '6px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '14px 20px',
};

const secondaryButton = {
  backgroundColor: '#ffffff',
  border: '2px solid #2563eb',
  borderRadius: '6px',
  color: '#2563eb',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '14px 20px',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 40px',
};

const footer = {
  color: '#6b7280',
  fontSize: '12px',
  lineHeight: '18px',
  margin: '0 0 12px',
  padding: '0 40px',
};
