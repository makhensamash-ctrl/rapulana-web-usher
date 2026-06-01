import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { TemplateEntry } from "./registry";

const SITE_NAME = "Rapulana Attorneys";

interface Props {
  name?: string;
  date?: string;
  time?: string;
  matter?: string;
}

const BookingConfirmationEmail = ({ name, date, time, matter }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your consultation with {SITE_NAME} is reserved</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={eyebrow}>{SITE_NAME}</Text>
        <Heading style={h1}>
          {name ? `Thank you, ${name}.` : "Thank you for your booking."}
        </Heading>
        <Text style={lede}>
          We've received your consultation request and reserved the slot below.
          A member of our team will be in touch shortly to confirm.
        </Text>

        <Section style={card}>
          <Text style={cardLabel}>Date</Text>
          <Text style={cardValue}>{date || "—"}</Text>
          <Hr style={cardDivider} />
          <Text style={cardLabel}>Time</Text>
          <Text style={cardValue}>{time || "—"}</Text>
          <Hr style={cardDivider} />
          <Text style={cardLabel}>Duration</Text>
          <Text style={cardValue}>60 minutes</Text>
        </Section>

        {matter ? (
          <>
            <Text style={sectionLabel}>Your matter</Text>
            <Text style={matterText}>{matter}</Text>
          </>
        ) : null}

        <Text style={body}>
          If you need to reschedule or share additional documents, simply reply
          to this email and we'll take care of it.
        </Text>

        <Hr style={divider} />
        <Text style={footer}>
          {SITE_NAME} · Trusted legal counsel in South Africa
        </Text>
        <Text style={footerSmall}>
          You're receiving this email because you booked a consultation with us.
        </Text>
      </Container>
    </Body>
  </Html>
);

export const template = {
  component: BookingConfirmationEmail,
  subject: "Your consultation with Rapulana Attorneys is reserved",
  displayName: "Booking confirmation (client)",
  previewData: {
    name: "Jane Doe",
    date: "Monday, 8 June 2026",
    time: "10:00",
    matter: "Review of commercial lease agreement.",
  },
} satisfies TemplateEntry;

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "Georgia, 'Times New Roman', serif",
  margin: 0,
  padding: 0,
};
const container = { maxWidth: "560px", margin: "0 auto", padding: "40px 28px" };
const eyebrow = {
  fontFamily: "Arial, sans-serif",
  fontSize: "11px",
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
  color: "#8a6d3b",
  margin: "0 0 16px",
};
const h1 = {
  fontSize: "28px",
  fontWeight: 400,
  color: "#1a1a1a",
  margin: "0 0 16px",
  lineHeight: 1.25,
};
const lede = {
  fontFamily: "Arial, sans-serif",
  fontSize: "15px",
  lineHeight: 1.6,
  color: "#4a4a4a",
  margin: "0 0 28px",
};
const card = {
  border: "1px solid #e5e0d7",
  borderLeft: "3px solid #8a6d3b",
  padding: "20px 24px",
  margin: "0 0 28px",
  backgroundColor: "#fbfaf7",
};
const cardLabel = {
  fontFamily: "Arial, sans-serif",
  fontSize: "11px",
  letterSpacing: "1.5px",
  textTransform: "uppercase" as const,
  color: "#8a6d3b",
  margin: "0 0 4px",
};
const cardValue = {
  fontFamily: "Arial, sans-serif",
  fontSize: "16px",
  color: "#1a1a1a",
  fontWeight: 600,
  margin: "0 0 12px",
};
const cardDivider = { borderColor: "#e5e0d7", margin: "12px 0" };
const sectionLabel = {
  fontFamily: "Arial, sans-serif",
  fontSize: "11px",
  letterSpacing: "1.5px",
  textTransform: "uppercase" as const,
  color: "#8a6d3b",
  margin: "0 0 6px",
};
const matterText = {
  fontFamily: "Arial, sans-serif",
  fontSize: "14px",
  lineHeight: 1.6,
  color: "#4a4a4a",
  margin: "0 0 24px",
  fontStyle: "italic" as const,
};
const body = {
  fontFamily: "Arial, sans-serif",
  fontSize: "14px",
  lineHeight: 1.6,
  color: "#4a4a4a",
  margin: "0 0 28px",
};
const divider = { borderColor: "#e5e0d7", margin: "32px 0 16px" };
const footer = {
  fontFamily: "Arial, sans-serif",
  fontSize: "13px",
  color: "#1a1a1a",
  margin: "0 0 4px",
};
const footerSmall = {
  fontFamily: "Arial, sans-serif",
  fontSize: "11px",
  color: "#8a8a8a",
  margin: 0,
};
