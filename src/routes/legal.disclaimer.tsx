import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/legal/disclaimer")({
  component: DisclaimerPage,
  head: () => ({
    meta: [
      { title: "Disclaimer & Terms | Rapulana Attorneys" },
      { name: "description", content: "Website disclaimer and terms and conditions for use of the Rapulana Attorneys website." },
      { property: "og:title", content: "Disclaimer & Terms | Rapulana Attorneys" },
      { property: "og:description", content: "Website disclaimer and terms and conditions for use of the Rapulana Attorneys website." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function DisclaimerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="border-b border-border bg-secondary/30">
          <div className="container-prose py-12">
            <p className="eyebrow text-gold">Legal</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">Disclaimer & Terms</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Terms of use and disclaimer governing your access to and use of the Rapulana Attorneys website.
            </p>
          </div>
        </section>
        <section className="container-prose py-12">
          <article className="prose prose-neutral max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mt-10 prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed">
            <h2>Disclaimer</h2>
            <p>
              This disclaimer is deemed to form an integral part of the content of any e-mail communication,
              including any attachments thereto, in terms of Section 11 of the Electronic Communications and
              Transactions Act, 25 of 2002. The information contained in any e-mail communication is strictly
              confidential and privileged and is intended for the addressee only. Any unauthorized disclosure
              and/or use of the information contained therein, by a party other than the addressee, are strictly
              prohibited.
            </p>
            <p>
              The information contained and the opinions expressed on this website are of a general nature and
              do not constitute comprehensive legal advice. The primary objective of the said information and
              opinions is to guide users. Any party acting upon such information and opinions does so at their
              own risk. Rapulana Attorneys does not accept liability for any damages arising from the use of the
              information. Should you require legal advice please contact us. It will be our pleasure to assist
              you. It is advisable to seek professional legal advice prior to pursuing any course of action.
            </p>
            <p>
              Hyperlinks to other websites are provided as a convenience only, and imply neither responsibility
              for, nor approval of the information contained in those other websites. Rapulana Attorneys makes
              no warranty, either express or implied, as to the accuracy, availability, reliability or content of
              such information.
            </p>
            <p>Nothing in or relating to this disclaimer shall be deemed a waiver of any of our rights.</p>

            <h3>Copyright Notice</h3>
            <p>
              The content of this website is subject to copyright protection. No part thereof may be reproduced
              in any manner of form, or by any means whatsoever, without the prior written consent of Rapulana
              Attorneys. Any unauthorised reproduction of this material will constitute copyright infringement
              and render the offender liable under civil law and criminal law.
            </p>
            <p>
              The use and exploitation of this material for educational purposes, or for private use, is exempted
              from the above prohibition.
            </p>

            <h2>Terms and Conditions</h2>
            <p className="text-muted-foreground"><em>Last updated on 22 June 2026.</em></p>

            <h3>1. Introduction</h3>
            <p>
              These Terms and conditions apply to this website and to the transactions related to our products
              and services. You may be bound by additional contracts related to your relationship with us or any
              products or services that you receive from us. If any provisions of the additional contracts conflict
              with any provisions of these Terms, the provisions of these additional contracts will control and
              prevail.
            </p>

            <h3>2. Binding</h3>
            <p>
              By registering with, accessing, or otherwise using this website, you hereby agree to be bound by
              these Terms and conditions set forth below. The mere use of this website implies the knowledge
              and acceptance of these Terms and conditions. In some particular cases, we can also ask you to
              explicitly agree.
            </p>

            <h3>3. Electronic communication</h3>
            <p>
              By using this website or communicating with us by electronic means, you agree and acknowledge
              that we may communicate with you electronically on our website or by sending an email to you, and
              you agree that all agreements, notices, disclosures, and other communications that we provide to
              you electronically satisfy any legal requirement, including but not limited to the requirement that
              such communications should be in writing.
            </p>

            <h3>4. Intellectual property</h3>
            <p>
              We or our licensors own and control all of the copyright and other intellectual property rights on
              the website and the data, information, and other resources displayed by or accessible within the
              website.
            </p>
            <p>
              <strong>4.1 All the rights are reserved.</strong> Unless specific content dictates otherwise, you are
              not granted a license or any other right under Copyright, Trademark, Patent, or other Intellectual
              Property Rights. This means that you will not use, copy, reproduce, perform, display, distribute,
              embed into any electronic medium, alter, reverse engineer, decompile, transfer, download,
              transmit, monetize, sell, market, or commercialize any resources on this website in any form,
              without our prior written permission, except and only insofar as otherwise stipulated in
              regulations of mandatory law (such as the right to quote).
            </p>

            <h3>5. Third-party property</h3>
            <p>
              Our website may include hyperlinks or other references to other party's websites. We do not
              monitor or review the content of other party's websites which are linked to from this website.
              Products or services offered by other websites shall be subject to the applicable Terms and
              Conditions of those third parties. Opinions expressed or material appearing on those websites are
              not necessarily shared or endorsed by us.
            </p>
            <p>
              We will not be responsible for any privacy practices or content of these sites. You bear all risks
              associated with the use of these websites and any related third-party services. We will not accept
              any responsibility for any loss or damage in whatever manner, however caused, resulting from your
              disclosure to third parties of personal information.
            </p>

            <h3>6. Responsible use</h3>
            <p>
              By visiting our website, you agree to use it only for the purposes intended and as permitted by
              these Terms, any additional contracts with us, and applicable laws, regulations, and generally
              accepted online practices and industry guidelines. You must not use our website or services to use,
              publish or distribute any material which consists of (or is linked to) malicious computer software;
              use data collected from our website for any direct marketing activity, or conduct any systematic or
              automated data collection activities on or in relation to our website.
            </p>
            <p>
              Engaging in any activity that causes, or may cause, damage to the website or that interferes with
              the performance, availability, or accessibility of the website is strictly prohibited.
            </p>

            <h3>7. Idea submission</h3>
            <p>
              Do not submit any ideas, inventions, works of authorship, or other information that can be
              considered your own intellectual property that you would like to present to us unless we have first
              signed an agreement regarding the intellectual property or a non-disclosure agreement. Should
              you disclose such information to us, with the absence of such written agreement, you grant to us
              a worldwide, irrevocable, non-exclusive, royalty-free license to use, reproduce, store, adapt,
              publish, translate and distribute your content in any existing or future media.
            </p>

            <h3>8. Termination of use</h3>
            <p>
              We may, in our sole discretion, at any time temporarily or permanently modify or discontinue
              access to the website or any Service thereon. You agree that we will not be liable to you or any
              third party for any such modification, suspension or discontinuance of your access to, or use of,
              the website or any content that you may have shared on the website. You will not be entitled to
              any compensation or other payment, even if certain features, settings, and/or any Content you
              have contributed or have come to rely on, are permanently lost. You must not circumvent or
              bypass, or attempt to circumvent or bypass, any access restriction measures on our website.
            </p>

            <h3>9. Warranties and liability</h3>
            <p>
              Nothing in this section will limit or exclude any warranty implied by law that it would be unlawful
              to limit or to exclude. This website and all content on the website are provided on an "as is" and
              "as available" basis and may include inaccuracies or typographical errors. We expressly disclaim all
              warranties of any kind, whether express or implied, as to the availability, accuracy, or completeness
              of the Content. We make no warranty that:
            </p>
            <ul>
              <li>this website or our content will meet your requirements;</li>
              <li>this website will be available on an uninterrupted, timely, secure, or error-free basis.</li>
            </ul>
            <p>
              The following provisions of this section will apply to the maximum extent permitted by applicable
              law and will not limit or exclude our liability in respect of any matter which it would be unlawful or
              illegal for us to limit or to exclude our liability. In no event will we be liable for any direct or
              indirect damages (including any damages for loss of profits or revenue, loss or corruption of data,
              software or database, or loss of or harm to property or data) incurred by you or any third party,
              arising from your access to, or use of our website.
            </p>
            <p>
              Except to the extent any additional contract expressly states otherwise, our maximum liability to
              you for all damages arising out of, or related to the website or any products and services marketed
              or sold through the website, regardless of the form of legal action that imposes liability (whether
              in contract, equity, negligence, intended conduct, tort or otherwise) will be limited to the total
              price that you paid to us to purchase such products or services or use the website. Such limit will
              apply in the aggregate to all your claims, actions and causes of action of every kind and nature.
            </p>

            <h3>10. Privacy</h3>
            <p>
              To access our website and/or services, you may be required to provide certain information about
              yourself as part of the registration process. You agree that any information you provide will always
              be accurate, correct, and up to date.
            </p>
            <p>
              We have developed a policy to address any privacy concerns you may have. For more information,
              please see our Privacy Statement.
            </p>

            <h3>11. Export restrictions / Legal compliance</h3>
            <p>
              Access to the website from territories or countries where the Content or purchase of the products
              or Services sold on the website is illegal is prohibited. You may not use this website in violation of
              export laws and regulations of South Africa.
            </p>

            <h3>12. Assignment</h3>
            <p>
              You may not assign, transfer or sub-contract any of your rights and/or obligations under these
              Terms and conditions, in whole or in part, to any third party without our prior written consent. Any
              purported assignment in violation of this Section will be null and void.
            </p>

            <h3>13. Breaches of these Terms and conditions</h3>
            <p>
              Without prejudice to our other rights under these Terms and Conditions, if you breach these Terms
              and Conditions in any way, we may take such action as we deem appropriate to deal with the
              breach, including temporarily or permanently suspending your access to the website, contacting
              your internet service provider to request that they block your access to the website, and/or
              commence legal action against you.
            </p>

            <h3>14. Indemnification</h3>
            <p>
              You agree to indemnify, defend and hold us harmless, from and against any and all claims,
              liabilities, damages, losses and expenses, relating to your violation of these Terms and conditions,
              and applicable laws, including intellectual property rights and privacy rights. You will promptly
              reimburse us for our damages, losses, costs and expenses relating to or arising out of such claims.
            </p>

            <h3>15. Waiver</h3>
            <p>
              Failure to enforce any of the provisions set out in these Terms and Conditions and any Agreement,
              or failure to exercise any option to terminate, shall not be construed as waiver of such provisions
              and shall not affect the validity of these Terms and Conditions or of any Agreement or any part
              thereof, or the right thereafter to enforce each and every provision.
            </p>

            <h3>16. Language</h3>
            <p>
              These Terms and Conditions will be interpreted and construed exclusively in English. All notices
              and correspondence will be written exclusively in that language.
            </p>

            <h3>17. Entire agreement</h3>
            <p>
              These Terms and Conditions, together with our Privacy Policy constitute the entire agreement
              between you and Rapulana Attorneys in relation to your use of this website.
            </p>

            <h3>18. Updating of these Terms and conditions</h3>
            <p>
              We may update these Terms and Conditions from time to time. It is your obligation to periodically
              check these Terms and Conditions for changes or updates. The date provided at the beginning of
              these Terms and Conditions is the latest revision date. Changes to these Terms and Conditions
              will become effective upon such changes being posted to this website. Your continued use of this
              website following the posting of changes or updates will be considered notice of your acceptance
              to abide by and be bound by these Terms and Conditions.
            </p>

            <h3>19. Choice of Law and Jurisdiction</h3>
            <p>
              These Terms and Conditions shall be governed by the laws of South Africa. Any disputes relating
              to these Terms and Conditions shall be subject to the jurisdiction of the courts of South Africa. If
              any part or provision of these Terms and Conditions is found by a court or other authority to be
              invalid and/or unenforceable under applicable law, such part or provision will be modified, deleted
              and/or enforced to the maximum extent permissible so as to give effect to the intent of these
              Terms and Conditions. The other provisions will not be affected.
            </p>

            <h3>20. Contact information</h3>
            <p>This website is owned and operated by Rapulana Attorneys.</p>
            <p>You may contact us regarding these Terms and Conditions through our contact page.</p>
          </article>
        </section>
      </main>
    </div>
  );
}
