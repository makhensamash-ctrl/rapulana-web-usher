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
  decision?: "accepted" | "declined";
  note?: string;
}

const BookingDecisionEmail = ({ name, date, time, decision, note }: Props) => {
  const accepted = decision !== "declined";
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>
        {accepted
          ? `Your consultation with ${SITE_NAME} is confirmed`
          : `Update on your consultation request with ${SITE_NAME}`}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={eyebrow}>{SITE_NAME}</Text>
          <Heading style={h1}>
            {accepted
              ? "Your consultation is confirmed"
              : "We couldn't confirm this slot"}
          </Heading>
          <Text style={lede}>
            {name ? `Hi ${name}, ` : "Hello, "}
            {accepted
              ? "we're pleased to confirm your consultation for the date and time below. An invoice will follow by email to finalise payment."
              : "unfortunately we are unable to accommodate your requested consultation slot. You are welcome to book another time that suits you."}
          </Text>

          <Section style={card}>
            <Text style={cardLabel}>Date</Text>
            <Text style={cardValue}>{date || "—"}</Text>
            <Hr style={cardDivider} />
            <Text style={cardLabel}>Time</Text>
            <Text style={cardValue}>{time || "—"}</Text>
            <Hr style={cardDivider} />
            <Text style={cardLabel}>Status</Text>
            <Text style={cardValue}>{accepted ? "Confirmed" : "Not available"}</Text>
          </Section>

          {note ? (
            <>
              <Text style={sectionLabel}>Note from our team</Text>
              <Text style={matterText}>{note}</Text>
            </>
          ) : null}

          <Text style={body}>
            If you have any questions, simply reply to this email and we'll assist you.
          </Text>

          <Hr style={divider} />
          <Text style={footer}>{SITE_NAME} · Trusted legal counsel in South Africa</Text>
          <Text style={footerSmall}>
            You're receiving this email because you requested a consultation with us.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export const template = {
  component: BookingDecisionEmail,
  subject: (data: Record<string, any>) =>
    data?.decision === "declined"
      ? "Update on your consultation request — Rapulana Attorneys"
      : "Your consultation is confirmed — Rapulana Attorneys",
  displayName: "Booking decision (client)",
  previewData: {
    name: "Jane Doe",
    date: "Monday, 8 June 2026",
    time: "10:00",
    decision: "accepted",
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
