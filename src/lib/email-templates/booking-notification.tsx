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

interface Props {
  name?: string;
  email?: string;
  phone?: string;
  matter?: string;
  date?: string;
  time?: string;
  attachmentUrl?: string;
}

const BookingNotificationEmail = ({
  name,
  email,
  phone,
  matter,
  date,
  time,
  attachmentUrl,
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New consultation booking — {name || "client"}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={eyebrow}>New booking</Text>
        <Heading style={h1}>Consultation request received</Heading>
        <Text style={lede}>
          A new consultation has been booked through the website.
        </Text>

        <Section style={card}>
          <Row label="Name" value={name} />
          <Row label="Email" value={email} />
          <Row label="Phone" value={phone} />
          <Row label="Date" value={date} />
          <Row label="Time" value={time} last />
        </Section>

        {matter ? (
          <>
            <Text style={sectionLabel}>Matter</Text>
            <Text style={matterText}>{matter}</Text>
          </>
        ) : null}

        {attachmentUrl ? (
          <>
            <Text style={sectionLabel}>Attachment</Text>
            <Text style={attachmentText}>{attachmentUrl}</Text>
          </>
        ) : null}

        <Hr style={divider} />
        <Text style={footer}>Rapulana Attorneys — booking notification</Text>
      </Container>
    </Body>
  </Html>
);

const Row = ({
  label,
  value,
  last,
}: {
  label: string;
  value?: string;
  last?: boolean;
}) => (
  <>
    <Text style={rowLabel}>{label}</Text>
    <Text style={rowValue}>{value || "—"}</Text>
    {!last ? <Hr style={rowDivider} /> : null}
  </>
);

export const template = {
  component: BookingNotificationEmail,
  subject: (data) =>
    `New booking: ${data?.name || "Client"} — ${data?.date || ""} ${data?.time || ""}`.trim(),
  displayName: "Booking notification (admin)",
  to: "info@rapulana.co.za",
  previewData: {
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "+27 82 123 4567",
    matter: "Review of commercial lease agreement.",
    date: "Monday, 8 June 2026",
    time: "10:00",
  },
} satisfies TemplateEntry;

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "Arial, sans-serif",
  margin: 0,
  padding: 0,
};
const container = { maxWidth: "560px", margin: "0 auto", padding: "40px 28px" };
const eyebrow = {
  fontSize: "11px",
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
  color: "#8a6d3b",
  margin: "0 0 12px",
};
const h1 = {
  fontFamily: "Georgia, 'Times New Roman', serif",
  fontSize: "24px",
  fontWeight: 400,
  color: "#1a1a1a",
  margin: "0 0 12px",
  lineHeight: 1.25,
};
const lede = { fontSize: "14px", color: "#4a4a4a", margin: "0 0 24px" };
const card = {
  border: "1px solid #e5e0d7",
  borderLeft: "3px solid #8a6d3b",
  padding: "16px 24px",
  margin: "0 0 24px",
  backgroundColor: "#fbfaf7",
};
const rowLabel = {
  fontSize: "11px",
  letterSpacing: "1.5px",
  textTransform: "uppercase" as const,
  color: "#8a6d3b",
  margin: "0 0 2px",
};
const rowValue = {
  fontSize: "15px",
  color: "#1a1a1a",
  fontWeight: 600,
  margin: "0 0 10px",
};
const rowDivider = { borderColor: "#e5e0d7", margin: "10px 0" };
const sectionLabel = {
  fontSize: "11px",
  letterSpacing: "1.5px",
  textTransform: "uppercase" as const,
  color: "#8a6d3b",
  margin: "0 0 6px",
};
const matterText = {
  fontSize: "14px",
  lineHeight: 1.6,
  color: "#4a4a4a",
  margin: "0 0 20px",
  fontStyle: "italic" as const,
};
const attachmentText = {
  fontSize: "13px",
  color: "#4a4a4a",
  margin: "0 0 20px",
  wordBreak: "break-all" as const,
};
const divider = { borderColor: "#e5e0d7", margin: "28px 0 12px" };
const footer = { fontSize: "11px", color: "#8a8a8a", margin: 0 };
