import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/legal/paia-manual")({
  component: PaiaManualPage,
  head: () => ({
    meta: [
      { title: "PAIA Manual | Rapulana Attorneys" },
      { name: "description", content: "Rapulana Attorneys PAIA Manual prepared under Section 51 of the Promotion of Access to Information Act." },
      { property: "og:title", content: "PAIA Manual | Rapulana Attorneys" },
      { property: "og:description", content: "Rapulana Attorneys PAIA Manual prepared under Section 51 of the Promotion of Access to Information Act." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function PaiaManualPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="border-b border-border bg-secondary/30">
          <div className="container-prose py-12">
            <p className="eyebrow text-gold">Legal</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">PAIA Manual</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Prepared in accordance with Section 51 of the Promotion of Access to Information Act 2 of 2000
              ("the Act").
            </p>
          </div>
        </section>
        <section className="container-prose py-12">
          <article className="prose prose-neutral max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mt-10 prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed">
            <h2>1. Purpose of the PAIA Manual</h2>
            <p>This PAIA Manual is useful for the public to:</p>
            <ul>
              <li>check the categories of records held by a body which are available without a person having to submit a formal PAIA request;</li>
              <li>have a sufficient understanding of how to make a request for access to a record of the body, by providing a description of the subjects on which the body holds records and the categories of records held on each subject;</li>
              <li>know the description of the records of the body which are available in accordance with any other legislation;</li>
              <li>access all the relevant contact details of the Information Officer who will assist the public with the records they intend to access;</li>
              <li>know the description of the guide on how to use PAIA, as updated by the Regulator, and how to obtain access to it;</li>
              <li>know if the body will process personal information, the purpose of processing of personal information and the description of the categories of data subjects and of the information or categories of information relating thereto;</li>
              <li>know the recipients or categories of recipients to whom the personal information may be supplied;</li>
              <li>know if the body has planned to transfer or process personal information outside the Republic of South Africa and the recipients or categories of recipients to whom the personal information may be supplied; and</li>
              <li>know whether the body has appropriate security measures to ensure the confidentiality, integrity and availability of the personal information which is to be processed.</li>
            </ul>

            <h2>2. Key Contact Details for Access to Information</h2>
            <div className="not-prose overflow-hidden rounded-xl border border-border">
              <table className="w-full text-sm">
                <tbody className="[&_td]:border-t [&_td]:border-border [&_td]:p-3">
                  <tr><td className="w-1/2 bg-secondary/40 font-medium">Name of private body</td><td>R Rapulana Inc t/a Rapulana Attorneys</td></tr>
                  <tr><td className="bg-secondary/40 font-medium">Name of head of private body</td><td>Rethabile Rapulana</td></tr>
                  <tr><td className="bg-secondary/40 font-medium">Registered street address</td><td>Office 6.1 East, First Floor, Brooklyn Court, 361 Veale Street, Nieuw Muckleneuk, Pretoria</td></tr>
                  <tr><td className="bg-secondary/40 font-medium">Postal address</td><td>Office 6.1 East, First Floor, Brooklyn Court, 361 Veale Street, Nieuw Muckleneuk, Pretoria</td></tr>
                  <tr><td className="bg-secondary/40 font-medium">Telephone number</td><td>012 880 3154</td></tr>
                  <tr><td className="bg-secondary/40 font-medium">Email address</td><td>info@rapulana.co.za</td></tr>
                  <tr><td className="bg-secondary/40 font-medium">Website</td><td>www.rapulana.co.za</td></tr>
                  <tr><td className="bg-secondary/40 font-medium">Person authorised to assist with requests</td><td>Rethabile Rapulana</td></tr>
                </tbody>
              </table>
            </div>

            <h2>3. Guide on How to Use PAIA and How to Obtain Access to the Guide</h2>
            <p>
              The Information Regulator has, in terms of section 10(1) of PAIA, as amended, updated and made
              available the revised guide on how to use PAIA ("Guide"), in an easily comprehensible form and
              manner, as may reasonably be required by a person who wishes to exercise any right contemplated
              in PAIA and POPIA.
            </p>
            <p>The Guide contains the description of:</p>
            <ul>
              <li>the objects of PAIA and POPIA;</li>
              <li>the postal and street address, phone and electronic mail address of the Information Officer;</li>
              <li>the request forms and submission procedures, including the assistance available in terms of PAIA and POPIA and the assistance available from the Regulator;</li>
              <li>all remedies in law available regarding an act or failure to act in respect of a right or duty conferred or imposed by PAIA and POPIA, including the manner of lodging an internal appeal, a complaint to the Regulator, and an application with a court against a decision by the Information Officer of a public body, a decision on internal appeal or a decision by the Regulator or a decision of the head of a private body; and</li>
              <li>the applicable regulations and fees.</li>
            </ul>
            <p>The Guide can also be obtained upon request to the Information Officer or from the website of the Regulator (https://www.justice.gov.za/inforeg/).</p>

            <h2>4. Introduction to Rapulana Attorneys</h2>
            <p>
              Rapulana Attorneys is a law firm providing legal services which include civil litigation, legal
              collections, trust and estate planning, intellectual property, company and commercial law to our
              clients.
            </p>

            <h2>5. Categories of Records Available</h2>
            <p>
              Records of a public nature, typically those disclosed on Rapulana Attorneys' website and annual
              reports may be accessed by the public without the need to submit a formal application in terms of
              PAIA. Access to all other non-public records held by Rapulana Attorneys should be formally applied
              for in terms of the provisions of PAIA.
            </p>
            <p>
              Where applicable, Rapulana Attorneys holds records as required in accordance with the legislation
              listed below. Accessibility to documents and records kept in accordance with legislation may be
              refused in accordance with the grounds of refusal set out in this Manual and/or PAIA.
            </p>
            <h3>5.1 Applicable Legislation</h3>
            <ul>
              <li>Arbitration Act, 42 of 1965</li>
              <li>Attorneys Act, 53 of 1979</li>
              <li>Basic Conditions of Employment Act, 57 of 1997</li>
              <li>Broad Based Black Economic Empowerment Act, 53 of 2003</li>
              <li>Companies Act, 71 of 2008</li>
              <li>Companies Act, 61 of 1973 (those sections not yet repealed)</li>
              <li>Compensation for Occupational Injuries and Diseases Act, 130 of 1993</li>
              <li>Competition Act, 89 of 1988</li>
              <li>Constitution of the Republic of South Africa Act, 108 of 1996</li>
              <li>Consumer Protection Act, 68 of 2008</li>
              <li>Copyright Act, 98 of 1978</li>
              <li>Counterfeit Goods Act, 37 of 1997</li>
              <li>Designs Act, 195 of 1993</li>
              <li>Electronic Communications and Transactions Act, 25 of 2002</li>
              <li>Employment Equity Act, 55 of 1998</li>
              <li>Financial Intelligence Centre Act, 38 of 2001</li>
              <li>Insolvency Act, 24 of 1936</li>
              <li>Intellectual Property Laws Amendments Act, 38 of 1997</li>
              <li>Labour Relations Act, 66 of 1995</li>
              <li>National Credit Act, 34 of 2005</li>
              <li>Occupational Health and Safety Act, 85 of 1993</li>
              <li>Promotion of Access to Information Act, 2 of 2000</li>
              <li>Promotion of Equality & Prevention of Unfair Discrimination Amendment Act, 52 of 2002</li>
              <li>Protected Disclosures Act, 26 of 2000</li>
              <li>Protection of Personal Information Act, 4 of 2013</li>
              <li>Regulation of Interception of Communications and Provision of Communications Related Information Act, 70 of 2002</li>
              <li>Skills Development Act, 97 of 1998</li>
              <li>Skills Development Levy Act, 9 of 1999</li>
              <li>Trade Marks Act, 194 of 1993</li>
              <li>Unemployment Insurance Act, 30 of 1966</li>
              <li>Value Added Tax Act, 89 of 1991</li>
            </ul>

            <h3>5.2 Categories of Information Held</h3>
            <p>Rapulana Attorneys holds the following categories of information. A request made in terms of PAIA for records in any of the categories may be refused in accordance with the grounds of refusal in this Manual and/or PAIA.</p>
            <p><strong>Client related records:</strong></p>
            <ul>
              <li>Records provided by clients;</li>
              <li>Records provided by clients to third parties acting on behalf of Rapulana Attorneys;</li>
              <li>Records generated by or within Rapulana Attorneys relating to its clients, including transactional records;</li>
              <li>Records provided by a third party relating to Rapulana Attorneys' clients.</li>
            </ul>
            <p><strong>Human resource records:</strong></p>
            <ul>
              <li>Personal records; employment contracts; medical aid records; retirement annuity fund records; workplace policies; disciplinary records; leave records; training records; skills development/levy records; employee addresses and contact lists; performance management records; employee correspondence.</li>
            </ul>
            <p><strong>Business/Statutory related records:</strong></p>
            <ul>
              <li>Company incorporation documents; minutes of meetings of the board of directors; records relating to the appointments of directors, auditors and other officers; receipts and payments; bank statements; list of debtors and creditors; management accounts; asset registers; invoices; trade marks and intellectual property; internal and external correspondence; marketing material, newsletters and brochures; policies and procedures; company secretarial records; supplier contracts; lease agreements.</li>
            </ul>
            <p><strong>Information technology records:</strong></p>
            <ul>
              <li>IT usage, equipment and security details; software licenses and supplier agreements; information policies and procedures.</li>
            </ul>

            <h2>6. Processing of Personal Information</h2>
            <h3>6.1 POPIA</h3>
            <p>Rapulana Attorneys processes personal information in accordance with Chapter 3 of POPIA for both natural and juristic persons.</p>
            <h3>6.2 Processing of Personal Information by Rapulana Attorneys</h3>
            <p>Rapulana Attorneys processes personal information in the ordinary course of business in providing legal advice and business advisory services. Personal information is processed for several reasons, including:</p>
            <ul>
              <li>the provision of services to clients;</li>
              <li>creating and managing commercial relationships with clients;</li>
              <li>creating and managing supplier relationships;</li>
              <li>general human resource and payroll functions — including obligations imposed by legislation;</li>
              <li>recruitment and procurement processes;</li>
              <li>analysis, evaluation, review and collation of information to provide advice and prepare or comment on opinions, memoranda, agreements, correspondence, reports, publications, documents relating to taxation, financial and other related business records;</li>
              <li>safety and security measures.</li>
            </ul>
            <h3>6.3 Categories of Data Subjects and Types of Personal Information Processed</h3>
            <p>
              Personal information of both natural and juristic persons is processed by Rapulana Attorneys in
              relation to employees, clients and potential clients, service providers, visitors, interviewees, and
              attendees of Rapulana Attorneys events (seminars, training sessions, etc.).
            </p>
            <h3>6.4 Disclosure of Personal Information to Third Parties</h3>
            <p>
              Rapulana Attorneys may disclose personal information processed to third parties for legitimate
              business purposes, in accordance with applicable law and subject to applicable professional and
              regulatory requirements regarding confidentiality. Where Rapulana Attorneys discloses information
              to third parties, the latter will be obliged to use such information for the reasons and purpose the
              personal information was disclosed for. Rapulana Attorneys may be obliged to disclose personal
              information where a duty to disclose is necessary, as required by legislation, or to protect the rights
              of Rapulana Attorneys.
            </p>
            <h3>6.5 Data Security</h3>
            <p>
              Rapulana Attorneys takes reasonable technical and organisational measures to protect and secure
              personal information from unauthorised or unlawful processing or access, accidental loss, alteration,
              damage or disclosure. Rapulana Attorneys regularly reviews security controls and processes to
              secure personal information. Where reasonable grounds exist that personal information has been
              accessed or acquired unlawfully by a third party, Rapulana Attorneys will notify the Information
              Regulator and the data subject concerned — unless the Regulator or other investigative body
              informs Rapulana Attorneys that such a notification will impede a criminal investigation.
            </p>
            <h3>6.6 Objecting to Processing of Personal Information — Correction, Deletion or Destruction</h3>
            <p>
              For POPIA-related requests to object to the processing, correction, deletion or destruction of
              personal information held by Rapulana Attorneys, the requester must complete the applicable
              prescribed form and submit it to the Information Officer at the address provided above. Data
              subjects have the right to request Rapulana Attorneys to confirm whether it holds personal
              information about the subject, the nature/description of the personal information held, and the
              details of third parties who have or have had access to the personal information. Rapulana
              Attorneys may charge the prescribed fees for reproduction of the personal information requested.
              PAIA-related requests may also be made by submitting the prescribed forms available on the
              website of the South African Human Rights Commission at www.sahrc.org.za.
            </p>

            <h2>7. Access to Records / Information</h2>
            <h3>7.1 Procedural Requirements</h3>
            <p>
              To request a record/information in terms of PAIA the requester must complete the prescribed
              request form and submit it to the Information Officer at the address provided above. The prescribed
              forms available on the website of the South African Human Rights Commission at www.sahrc.org.za
              may also be utilised. All requested information must be provided, failing which the process will be
              delayed until the required information is provided. The requester must provide sufficient detail on:
            </p>
            <ul>
              <li>the record/information being required;</li>
              <li>the nature or form of access that is required;</li>
              <li>the right that the requester is seeking to exercise and protect;</li>
              <li>the reason why access to the information is required to exercise or protect the right;</li>
              <li>the identity and contact details of the requester.</li>
            </ul>
            <p>If a request is made on behalf of another person, the requester must submit proof of the capacity in which the requester is making the request to the reasonable satisfaction of the Information Officer.</p>
            <h3>7.2 Fees Payable</h3>
            <p>PAIA provides for two types of fees payable, namely:</p>
            <ul>
              <li>a <strong>request fee</strong> — a standard non-refundable fee, payable to Rapulana Attorneys prior to the request being considered; and</li>
              <li>an <strong>access fee</strong> — payable to Rapulana Attorneys when access is granted and calculated with reference to reproduction costs, search, preparation and postal costs.</li>
            </ul>
            <p>Rapulana Attorneys may withhold a record/information until a requester has paid the fees applicable. The fee structure is available on the website of the South African Human Rights Commission at www.sahrc.org.za.</p>
            <h3>7.3 Applicable Time Periods</h3>
            <p>
              Rapulana Attorneys will inform the requester within 30 (thirty) days after receipt of the request of
              its decision to either grant or refuse the request. The 30-day period will start once Rapulana
              Attorneys receives all required information in the application request. The 30-day period may be
              extended by a further period of not more than 30 days if the request requires reviewing an
              extensive amount of information, would unreasonably interfere with the activities of Rapulana
              Attorneys, or relates to records sought that are not located at Rapulana Attorneys' offices/premises.
            </p>

            <h2>8. Outcome of Request for Information</h2>
            <h3>8.1 Granting of Information Request</h3>
            <p>
              In circumstances where Rapulana Attorneys grants a request for access to information, Rapulana
              Attorneys shall advise the requester of such decision and disclose the record of information only
              when payment of the access and reproduction fees has been received.
            </p>
            <h3>8.2 Refusal of Request for Information</h3>
            <p>Rapulana Attorneys is entitled in terms of the provisions of PAIA to refuse access to information on the following grounds:</p>
            <ul>
              <li>mandatory protection of the privacy of a third party who is a natural person, a deceased person or a juristic entity — which would involve the unreasonable disclosure of personal information;</li>
              <li>
                mandatory protection of the commercial information of a third party, if the record of information
                requested contains trade secrets; financial, scientific, commercial or technical information whose
                disclosure could likely cause harm to the financial or commercial interests of a third party; or
                information disclosed in confidence by a third party to Rapulana Attorneys where the disclosure
                could put such party at a disadvantage in negotiations or commercial competition;
              </li>
              <li>mandatory protection of confidential information of third parties protected in terms of an agreement;</li>
              <li>mandatory protection of the safety of individuals and protection of property;</li>
              <li>mandatory protection of records which would be regarded as privileged in legal proceedings;</li>
              <li>
                the commercial dealings of Rapulana Attorneys, which may include (but are not limited to) trade
                secrets; financial, commercial, scientific, technical or research information whose disclosure could
                likely cause harm to its financial or commercial interest; and requests for information that are
                frivolous and vexatious or require an unreasonable diversion of resources.
              </li>
            </ul>
            <p>
              In circumstances where a record cannot be found by Rapulana Attorneys or a record does not exist,
              the Information Officer shall, by way of affidavit or affirmation, notify the requester that it is not
              possible to give access to the requested record. Such a notice will be deemed to be a decision to
              refuse a request for access to the record for purposes of PAIA. If the record should later be found,
              the requester shall be given access to the record — unless the Information Officer refuses access to
              such record.
            </p>
            <h3>8.3 Remedies for Refusal of Request for Information</h3>
            <p>
              A requester or third party that is dissatisfied with the Information Officer's refusal to grant access
              to the requested information may, within 30 (thirty) days of notification of the decision, apply to a
              Court with competent jurisdiction for relief.
            </p>

            <h2>9. Availability of PAIA Manual</h2>
            <p>
              This Manual is available in English in electronic and hard copy format. The hard copies are
              available at the head office of Rapulana Attorneys. The electronic version of this Manual is
              available on Rapulana Attorneys' website. Prescribed request forms (Annexures A, B and C) are
              available on request from the Information Officer at the contact details listed above.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}
