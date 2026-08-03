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
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
  decision?: "accepted" | "declined";
  note?: string;
  actedBy?: string;
}

const BookingDecisionAdminEmail = ({
  name,
  email,
  phone,
  date,
  time,
  decision,
  note,
  actedBy,
}: Props) => {
  const accepted = decision !== "declined";
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>
        Consultation {accepted ? "accepted" : "declined"} — {name || "client"}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={eyebrow}>{SITE_NAME} · Admin</Text>
          <Heading style={h1}>
            Consultation {accepted ? "accepted" : "declined"}
          </Heading>
          <Text style={lede}>
            The client has been notified by email of this decision.
          </Text>

          <Section style={card}>
            <Text style={cardLabel}>Client</Text>
            <Text style={cardValue}>{name || "—"}</Text>
            <Hr style={cardDivider} />
            <Text style={cardLabel}>Contact</Text>
            <Text style={cardValue}>
              {email || "—"}
              {phone ? ` · ${phone}` : ""}
            </Text>
            <Hr style={cardDivider} />
            <Text style={cardLabel}>Slot</Text>
            <Text style={cardValue}>
              {date || "—"} at {time || "—"}
            </Text>
            <Hr style={cardDivider} />
            <Text style={cardLabel}>Decision</Text>
            <Text style={cardValue}>{accepted ? "Accepted" : "Declined"}</Text>
            {actedBy ? (
              <>
                <Hr style={cardDivider} />
                <Text style={cardLabel}>Actioned by</Text>
                <Text style={cardValue}>{actedBy}</Text>
              </>
            ) : null}
          </Section>

          {note ? (
            <>
              <Text style={sectionLabel}>Note sent to client</Text>
              <Text style={matterText}>{note}</Text>
            </>
          ) : null}

          <Hr style={divider} />
          <Text style={footer}>{SITE_NAME} · Internal notification</Text>
        </Container>
      </Body>
    </Html>
  );
};

export const template = {
  component: BookingDecisionAdminEmail,
  subject: (data: Record<string, any>) =>
    data?.decision === "declined"
      ? "Consultation declined — Rapulana Attorneys"
      : "Consultation accepted — Rapulana Attorneys",
  displayName: "Booking decision (admin)",
  to: "info@rapulana.co.za",
  previewData: {
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "073 000 0000",
    date: "Monday, 8 June 2026",
    time: "10:00",
    decision: "accepted",
    actedBy: "admin@rapulana.co.za",
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
  fontSize: "26px",
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
const divider = { borderColor: "#e5e0d7", margin: "32px 0 16px" };
const footer = {
  fontFamily: "Arial, sans-serif",
  fontSize: "13px",
  color: "#1a1a1a",
  margin: "0 0 4px",
};
