import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
export default function PrivacyPolicy() {
    useEffect(() => {
        const handleSmoothScroll = (event) => {
          const targetId = event.target.getAttribute("href");
          if (targetId.startsWith("#")) {
            event.preventDefault();
            const targetElement = document.querySelector(targetId);
    
            if (targetElement) {
              const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 120; // Offset -20px
    
              window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
              });
            }
          }
        };
    
        // Attach event listener to all anchor tags with #
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach((link) => link.addEventListener("click", handleSmoothScroll));
    
        return () => {
          // Cleanup event listeners
          links.forEach((link) => link.removeEventListener("click", handleSmoothScroll));
        };
      }, []);
  return (
    <React.Fragment>
      <Row>
        {/* <Col lg={12} xl="auto" className="w-calc-100-258"> */}
        <Col lg={12} xl={12}>
          <div className="resources-body">
            <div className="resources-heading mb-4">
              <h1>Privacy Policy</h1>
              <small><b>Last updated November 26, 2024</b>
              </small>
            </div>

            <div className="resources-content table-less-format mb-4">
              <p>
                This Privacy Notice for Van Welder LLC (doing business as Laser
                Bros) ("<strong>we</strong>," "<strong>us</strong>," or "
                <strong>our</strong>"), describes how and why we might access,
                collect, store, use, and/or share ("<strong>process</strong>")
                your personal information when you use our services ("
                <strong>Services</strong>"), including when you:
              </p>
              <ul className="wp-block-list table-less-format">
                <li>
                  Visit our website at{" "}
                  <a
                    href="https://laserbros.com/"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    https://laserbros.com
                  </a>
                  , or any website of ours that links to this Privacy Notice
                </li>
              </ul>
              <ul className="wp-block-list table-less-format">
                <li>
                  Use Sheet Metal Manufacturing Services. A platform for
                  uploading your DXF files in order to get a quote on laser
                  cutting services. Users who are signed in can also access our
                  services too.
                </li>
              </ul>
              <ul className="wp-block-list table-less-format">
                <li>
                  Engage with us in other related ways, including any sales,
                  marketing, or events
                </li>
              </ul>
              <p>
                <strong>Questions or concerns? </strong>Reading this Privacy
                Notice will help you understand your privacy rights and choices.
                We are responsible for making decisions about how your personal
                information is processed. If you do not agree with our policies
                and practices, please do not use our Services. If you still have
                any questions or concerns, please contact us at 
                &nbsp;<a href="mailto:info@LaserBros.com">
                          info@LaserBros.com
                        </a>.
              </p>
              <h5>
                <strong>SUMMARY OF KEY POINTS</strong>
              </h5>
              <p>
                <strong>
                  <em>
                    This summary provides key points from our Privacy Notice,
                    but you can find out more details about any of these topics
                    by clicking the link following each key point or by using
                    our{" "}
                  </em>
                </strong>
                
                  <strong>
                    <em><a href="#toc">table of contents</a></em>
                  </strong>
                
                <strong>
                  <em> below to find the section you are looking for.</em>
                </strong>
              </p>
              <p>
                <strong>What personal information do we process?</strong> When
                you visit, use, or navigate our Services, we may process
                personal information depending on how you interact with us and
                the Services, the choices you make, and the products and
                features you use. Learn more about{" "}
                <a href="#personalinfo">
                  personal information you disclose to us
                </a>
                .
              </p>
              <p>
                <strong>
                  Do we process any sensitive personal information?{" "}
                </strong>
                Some of the information may be considered "special" or
                "sensitive" in certain jurisdictions, for example your racial or
                ethnic origins, sexual orientation, and religious beliefs. We do
                not process sensitive personal information.
              </p>
              <p>
                <strong>
                  Do we collect any information from third parties?
                </strong>{" "}
                We do not collect any information from third parties.
              </p>
              <p>
                <strong>How do we process your information?</strong> We process
                your information to provide, improve, and administer our
                Services, communicate with you, for security and fraud
                prevention, and to comply with law. We may also process your
                information for other purposes with your consent. We process
                your information only when we have a valid legal reason to do
                so. Learn more about{" "}
                <a href="#infouse">how we process your information</a>.
              </p>
              <p>
                <strong>
                  In what situations and with which parties do we share personal
                  information?
                </strong>{" "}
                We may share information in specific situations and with
                specific third parties. Learn more about{" "}
                <a href="#whoshare">
                  when and with whom we share your personal information
                </a>
                .
              </p>
              <p>
                <strong>How do we keep your information safe?</strong> We have
                adequate organizational and technical processes and procedures
                in place to protect your personal information. However, no
                electronic transmission over the internet or information storage
                technology can be guaranteed to be 100% secure, so we cannot
                promise or guarantee that hackers, cybercriminals, or other
                unauthorized third parties will not be able to defeat our
                security and improperly collect, access, steal, or modify your
                information. Learn more about{" "}
                <a href="#infosafe">how we keep your information safe</a>.
              </p>
              <p>
                <strong>What are your rights?</strong> Depending on where you
                are located geographically, the applicable privacy law may mean
                you have certain rights regarding your personal information.
                Learn more about{" "}
                <a href="#privacyrights">your privacy rights</a>.
              </p>
              <p>
                <strong>How do you exercise your rights?</strong> The easiest
                way to exercise your rights is by submitting a{" "}
                <a
                  href="https://app.termly.io/notify/7b9b28fc-330b-43b3-a519-816ad5cdf3b5"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  data subject access request
                </a>
                , or by contacting us. We will consider and act upon any request
                in accordance with applicable data protection laws.
              </p>
              <p>
                Want to learn more about what we do with any information we
                collect? <a href="#toc">Review the Privacy Notice in full</a>.
              </p>
              <div id="toc">
                <h5><strong>TABLE OF CONTENTS</strong></h5>
              </div>
              <p>
                <a href="#infocollect">1. WHAT INFORMATION DO WE COLLECT?</a>
              </p>
              <p>
                <a href="#infouse">2. HOW DO WE PROCESS YOUR INFORMATION?</a>
              </p>
              <p>
                <a href="#whoshare">
                  3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
                </a>
              </p>
              <p>
                <a href="#cookies">
                  4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                </a>
              </p>
              <p>
                <a href="#inforetain">
                  5. HOW LONG DO WE KEEP YOUR INFORMATION?
                </a>
              </p>
              <p>
                <a href="#infosafe">6. HOW DO WE KEEP YOUR INFORMATION SAFE?</a>
              </p>
              <p>
                <a href="#infominors">
                  7. DO WE COLLECT INFORMATION FROM MINORS?
                </a>
              </p>
              <p>
                <a href="#privacyrights">8. WHAT ARE YOUR PRIVACY RIGHTS?</a>
              </p>
              <p>
                <a href="#DNT">9. CONTROLS FOR DO-NOT-TRACK FEATURES</a>
              </p>
              <p>
                <a href="#uslaws">
                  10. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
                </a>
              </p>
              <p>
                <a href="#policyupdates">
                  11. DO WE MAKE UPDATES TO THIS NOTICE?
                </a>
              </p>
              <p>
                <a href="#contact">
                  12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                </a>
              </p>
              <p>
                <a href="#request">
                  13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT
                  FROM YOU?
                </a>
              </p>
              <h5 id="infocollect" className="mb-2">
                <strong>1. WHAT INFORMATION DO WE COLLECT?</strong>
              </h5>
                <strong>Personal information you disclose to us</strong>
              
              <p>
                <strong>
                  <em>In Short:</em>
                </strong>
                <strong>
                  <em> </em>
                </strong>
                <em>We collect personal information that you provide to us.</em>
              </p>
              <p>
                We collect personal information that you voluntarily provide to
                us when you register on the Services, express an interest in
                obtaining information about us or our products and Services,
                when you participate in activities on the Services, or otherwise
                when you contact us.
              </p>
              <p>
                <strong>Personal Information Provided by You.</strong> The
                personal information that we collect depends on the context of
                your interactions with us and the Services, the choices you
                make, and the products and features you use. The personal
                information we collect may include the following:
              </p>
              <ul className="wp-block-list table-less-format">
                <li>names</li>

                <li>phone numbers</li>
              
              
                <li>email addresses</li>
              
              
                <li>mailing addresses</li>
              
              
                <li>billing addresses</li>
              
              
                <li>debit/credit card numbers</li>
              </ul>
              <p>
                <strong>Sensitive Information.</strong> We do not process
                sensitive information.
              </p>
              <p>
                <strong>Payment Data.</strong> We may collect data necessary to
                process your payment if you choose to make purchases, such as
                your payment instrument number, and the security code associated
                with your payment instrument. All payment data is handled and
                stored by STRIPE. You may find their privacy notice link(s)
                here:{" "}
                <a
                  href="https://stripe.com/privacy"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  https://stripe.com/privacy
                </a>
                .
              </p>
              <p>
                All personal information that you provide to us must be true,
                complete, and accurate, and you must notify us of any changes to
                such personal information.
              </p>
              <p>
                <strong>Information automatically collected</strong>
              </p>
              <p>
                <strong>
                  <em>In Short:</em>
                </strong>
                <strong>
                  <em> </em>
                </strong>
                <em>
                  Some information — such as your Internet Protocol (IP) address
                  and/or browser and device characteristics — is collected
                  automatically when you visit our Services.
                </em>
              </p>
              <p>
                We automatically collect certain information when you visit,
                use, or navigate the Services. This information does not reveal
                your specific identity (like your name or contact information)
                but may include device and usage information, such as your IP
                address, browser and device characteristics, operating system,
                language preferences, referring URLs, device name, country,
                location, information about how and when you use our Services,
                and other technical information. This information is primarily
                needed to maintain the security and operation of our Services,
                and for our internal analytics and reporting purposes.
              </p>
              <p>
                Like many businesses, we also collect information through
                cookies and similar technologies.
              </p>
              <p>The information we collect includes:</p>
              <ul className="wp-block-list table-less-format">
                <li>
                  <em>Log and Usage Data.</em> Log and usage data is
                  service-related, diagnostic, usage, and performance
                  information our servers automatically collect when you access
                  or use our Services and which we record in log files.
                  Depending on how you interact with us, this log data may
                  include your IP address, device information, browser type, and
                  settings and information about your activity in the Services
                  (such as the date/time stamps associated with your usage,
                  pages and files viewed, searches, and other actions you take
                  such as which features you use), device event information
                  (such as system activity, error reports (sometimes called
                  "crash dumps"), and hardware settings).
                </li>
              </ul>
              <ul className="wp-block-list table-less-format">
                <li>
                  <em>Location Data.</em> We collect location data such as
                  information about your device's location, which can be either
                  precise or imprecise. How much information we collect depends
                  on the type and settings of the device you use to access the
                  Services. For example, we may use GPS and other technologies
                  to collect geolocation data that tells us your current
                  location (based on your IP address). You can opt out of
                  allowing us to collect this information either by refusing
                  access to the information or by disabling your Location
                  setting on your device. However, if you choose to opt out, you
                  may not be able to use certain aspects of the Services.
                </li>
              </ul>
              <h5 className="mb-2" id="infouse">
                <strong>2. HOW DO WE PROCESS YOUR INFORMATION?</strong>
              </h5>
              <p>
                <strong>
                  <em>In Short: </em>
                </strong>
                <em>
                  We process your information to provide, improve, and
                  administer our Services, communicate with you, for security
                  and fraud prevention, and to comply with law. We may also
                  process your information for other purposes with your consent.
                </em>
              </p>
              <p>
                <strong>
                  We process your personal information for a variety of reasons,
                  depending on how you interact with our Services, including:
                </strong>
              </p>
              <ul className="wp-block-list table-less-format">
                <li>
                  <strong>
                    To facilitate account creation and authentication and
                    otherwise manage user accounts.{" "}
                  </strong>
                  We may process your information so you can create and log in
                  to your account, as well as keep your account in working
                  order.
                </li>
              </ul>
              <ul className="wp-block-list table-less-format">
                <li>
                  <strong>
                    To send you marketing and promotional communications.{" "}
                  </strong>
                  We may process the personal information you send to us for our
                  marketing purposes, if this is in accordance with your
                  marketing preferences. You can opt out of our marketing emails
                  at any time. For more information, see "
                  <a href="#privacyrights">WHAT ARE YOUR PRIVACY RIGHTS?</a>"
                  below.
                </li>
              </ul>
              <ul className="wp-block-list table-less-format">
                <li>
                  <strong>
                    To evaluate and improve our Services, products, marketing,
                    and your experience.
                  </strong>{" "}
                  We may process your information when we believe it is
                  necessary to identify usage trends, determine the
                  effectiveness of our promotional campaigns, and to evaluate
                  and improve our Services, products, marketing, and your
                  experience.
                </li>
              </ul>
              <ul className="wp-block-list table-less-format">
                <li>
                  <strong>To identify usage trends.</strong> We may process
                  information about how you use our Services to better
                  understand how they are being used so we can improve them.
                </li>
              </ul>
              <ul className="wp-block-list table-less-format">
                <li>
                  <strong>
                    To determine the effectiveness of our marketing and
                    promotional campaigns.
                  </strong>{" "}
                  We may process your information to better understand how to
                  provide marketing and promotional campaigns that are most
                  relevant to you.
                </li>
              </ul>
              <h5 id="whoshare">
                <strong>
                  3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
                </strong>
              </h5>
              <p>
                <strong>
                  <em>In Short:</em>
                </strong>
                <em>
                  {" "}
                  We may share information in specific situations described in
                  this section and/or with the following third parties.
                </em>
              </p>
              <p>
                We may need to share your personal information in the following
                situations:
              </p>
              <ul className="wp-block-list table-less-format">
                <li>
                  <strong>Business Transfers.</strong> We may share or transfer
                  your information in connection with, or during negotiations
                  of, any merger, sale of company assets, financing, or
                  acquisition of all or a portion of our business to another
                  company.
                </li>
              </ul>
              <h5 className="mb-2" id="cookies">
                <strong>
                  4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                </strong>
              </h5>
              <p>
                <strong>
                  <em>In Short:</em>
                </strong>
                <em>
                  {" "}
                  We may use cookies and other tracking technologies to collect
                  and store your information.
                </em>
              </p>
              <p>
                We may use cookies and similar tracking technologies (like web
                beacons and pixels) to gather information when you interact with
                our Services. Some online tracking technologies help us maintain
                the security of our Services and your account, prevent crashes,
                fix bugs, save your preferences, and assist with basic site
                functions.
              </p>
              <p>
                We also permit third parties and service providers to use online
                tracking technologies on our Services for analytics and
                advertising, including to help manage and display
                advertisements, to tailor advertisements to your interests, or
                to send abandoned shopping cart reminders (depending on your
                communication preferences). The third parties and service
                providers use their technology to provide advertising about
                products and services tailored to your interests which may
                appear either on our Services or on other websites.
              </p>
              <p>
                To the extent these online tracking technologies are deemed to
                be a "sale"/"sharing" (which includes targeted advertising, as
                defined under the applicable laws) under applicable US state
                laws, you can opt out of these online tracking technologies by
                submitting a request as described below under section "
                <a href="#uslaws">
                  DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
                </a>
                "
              </p>
              <p>
                Specific information about how we use such technologies and how
                you can refuse certain cookies is set out in our Cookie Notice.
              </p>
              <p>
                <strong>Google Analytics</strong>
              </p>
              <p>
                We may share your information with Google Analytics to track and
                analyze the use of the Services. To opt out of being tracked by
                Google Analytics across the Services, visit{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  https://tools.google.com/dlpage/gaoptout
                </a>
                . For more information on the privacy practices of Google,
                please visit the{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Google Privacy &amp; Terms page
                </a>
                .
              </p>
              <h5 className="mb-2" id="inforetain">
                <strong>5. HOW LONG DO WE KEEP YOUR INFORMATION?</strong>
              </h5>
              <p>
                <strong>
                  <em>In Short: </em>
                </strong>
                <em>
                  We keep your information for as long as necessary to fulfill
                  the purposes outlined in this Privacy Notice unless otherwise
                  required by law.
                </em>
              </p>
              <p>
                We will only keep your personal information for as long as it is
                necessary for the purposes set out in this Privacy Notice,
                unless a longer retention period is required or permitted by law
                (such as tax, accounting, or other legal requirements). No
                purpose in this notice will require us keeping your personal
                information for longer than the period of time in which users
                have an account with us.
              </p>
              <p>
                When we have no ongoing legitimate business need to process your
                personal information, we will either delete or anonymize such
                information, or, if this is not possible (for example, because
                your personal information has been stored in backup archives),
                then we will securely store your personal information and
                isolate it from any further processing until deletion is
                possible.
              </p>
              <h5 className="mb-2" id="infosafe">
                <strong>6. HOW DO WE KEEP YOUR INFORMATION SAFE?</strong>
              </h5>
              <p>
                <strong>
                  <em>In Short: </em>
                </strong>
                <em>
                  We aim to protect your personal information through a system
                  of organizational and technical security measures.
                </em>
              </p>
              <p>
                We have implemented appropriate and reasonable technical and
                organizational security measures designed to protect the
                security of any personal information we process. However,
                despite our safeguards and efforts to secure your information,
                no electronic transmission over the Internet or information
                storage technology can be guaranteed to be 100% secure, so we
                cannot promise or guarantee that hackers, cybercriminals, or
                other unauthorized third parties will not be able to defeat our
                security and improperly collect, access, steal, or modify your
                information. Although we will do our best to protect your
                personal information, transmission of personal information to
                and from our Services is at your own risk. You should only
                access the Services within a secure environment.
              </p>
              <h5 id="infominors">
                <strong>7. DO WE COLLECT INFORMATION FROM MINORS?</strong>
              </h5>
              <p>
                <strong>
                  <em>In Short:</em>
                </strong>
                <em>
                  {" "}
                  We do not knowingly collect data from or market to children
                  under 18 years of age.
                </em>
              </p>
              <p>
                We do not knowingly collect, solicit data from, or market to
                children under 18 years of age, nor do we knowingly sell such
                personal information. By using the Services, you represent that
                you are at least 18 or that you are the parent or guardian of
                such a minor and consent to such minor dependent’s use of the
                Services. If we learn that personal information from users less
                than 18 years of age has been collected, we will deactivate the
                account and take reasonable measures to promptly delete such
                data from our records. If you become aware of any data we may
                have collected from children under age 18, please contact us at 
                &nbsp;<a href="mailto:info@LaserBros.com">
                          info@LaserBros.com
                        </a>.
              </p>
              <h5 id="privacyrights">
                <strong>8. WHAT ARE YOUR PRIVACY RIGHTS?</strong>
              </h5>
              <p>
                <strong>
                  <em>In Short:</em>
                </strong>
                <em>
                  {" "}
                  You may review, change, or terminate your account at any time,
                  depending on your country, province, or state of residence.
                </em>
              </p>
              <p>
                <strong>
                  <u>Withdrawing your consent:</u>
                </strong>{" "}
                If we are relying on your consent to process your personal
                information, which may be express and/or implied consent
                depending on the applicable law, you have the right to withdraw
                your consent at any time. You can withdraw your consent at any
                time by contacting us by using the contact details provided in
                the section "
                <a href="#contact">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>
                " below.
              </p>
              <p>
                However, please note that this will not affect the lawfulness of
                the processing before its withdrawal nor, when applicable law
                allows, will it affect the processing of your personal
                information conducted in reliance on lawful processing grounds
                other than consent.
              </p>
              <p>
                <strong>
                  <u>Opting out of marketing and promotional communications:</u>
                </strong>
                <strong> </strong>You can unsubscribe from our marketing and
                promotional communications at any time by clicking on the
                unsubscribe link in the emails that we send, replying "STOP" or
                "UNSUBSCRIBE" to the SMS messages that we send, or by contacting
                us using the details provided in the section "
                <a href="#contact">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>
                " below. You will then be removed from the marketing lists.
                However, we may still communicate with you — for example, to
                send you service-related messages that are necessary for the
                administration and use of your account, to respond to service
                requests, or for other non-marketing purposes.
              </p>
              <p>
                <strong>Account Information</strong>
              </p>
              <p>
                If you would at any time like to review or change the
                information in your account or terminate your account, you can:
              </p>
              <ul className="wp-block-list table-less-format">
                <li>
                  Log in to your account settings and update your user account.
                </li>
              </ul>
              <p>
                Upon your request to terminate your account, we will deactivate
                or delete your account and information from our active
                databases. However, we may retain some information in our files
                to prevent fraud, troubleshoot problems, assist with any
                investigations, enforce our legal terms and/or comply with
                applicable legal requirements.
              </p>
              <p>
                <strong>
                  <u>Cookies and similar technologies:</u>
                </strong>{" "}
                Most Web browsers are set to accept cookies by default. If you
                prefer, you can usually choose to set your browser to remove
                cookies and to reject cookies. If you choose to remove cookies
                or reject cookies, this could affect certain features or
                services of our Services.
              </p>
              <p>
                If you have questions or comments about your privacy rights, you 
                may email us at &nbsp;<a href="mailto:info@LaserBros.com">
                          info@LaserBros.com
                        </a>.
              </p>
              <h5 className="mb-2" id="DNT">
                <strong>9. CONTROLS FOR DO-NOT-TRACK FEATURES</strong>
              </h5>
              <p>
                Most web browsers and some mobile operating systems and mobile
                applications include a Do-Not-Track ("DNT") feature or setting
                you can activate to signal your privacy preference not to have
                data about your online browsing activities monitored and
                collected. At this stage, no uniform technology standard for
                recognizing and implementing DNT signals has been finalized. As
                such, we do not currently respond to DNT browser signals or any
                other mechanism that automatically communicates your choice not
                to be tracked online. If a standard for online tracking is
                adopted that we must follow in the future, we will inform you
                about that practice in a revised version of this Privacy Notice.
              </p>
              <p>
                California law requires us to let you know how we respond to web
                browser DNT signals. Because there currently is not an industry
                or legal standard for recognizing or honoring DNT signals, we do
                not respond to them at this time.
              </p>
              <h5 id="uslaws">
                <strong>
                  10. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
                </strong>
              </h5>
              <p>
                <strong>
                  <em>In Short: </em>
                </strong>
                <em>
                  If you are a resident of California, Colorado, Connecticut,
                  Delaware, Florida, Indiana, Iowa, Kentucky, Minnesota,
                  Montana, Nebraska, New Hampshire, New Jersey, Oregon,
                  Tennessee, Texas, Utah, or Virginia, you may have the right to
                  request access to and receive details about the personal
                  information we maintain about you and how we have processed
                  it, correct inaccuracies, get a copy of, or delete your
                  personal information. You may also have the right to withdraw
                  your consent to our processing of your personal information.
                  These rights may be limited in some circumstances by
                  applicable law. More information is provided below.
                </em>
              </p>
              <p>
                <strong>Categories of Personal Information We Collect</strong>
              </p>
              <p>
                We have collected the following categories of personal
                information in the past twelve (12) months:
              </p>

              <figure className="wp-block-table">
                <table className="has-fixed-layout table">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Category</strong>
                      </td>
                      <td>
                        <strong>Examples</strong>
                      </td>
                      <td>
                        <strong>Collected</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>A. Identifiers</td>
                      <td>
                        Contact details, such as real name, alias, postal
                        address, telephone or mobile contact number, unique
                        personal identifier, online identifier, Internet
                        Protocol address, email address, and account name
                      </td>
                      <td>NO</td>
                    </tr>
                
                    <tr>
                      <td>
                        B. Personal information as defined in the California
                        Customer Records statute
                      </td>
                      <td>
                        Name, contact information, education, employment,
                        employment history, and financial information
                      </td>
                      <td>NO</td>
                    </tr>
                  
                    <tr>
                      <td>
                        C. Protected classification characteristics under state
                        or federal law
                      </td>
                      <td>
                        Gender, age, date of birth, race and ethnicity, national
                        origin, marital status, and other demographic data
                      </td>
                      <td>NO</td>
                    </tr>
                    <tr>
                      <td>D. Commercial information</td>
                      <td>
                        Transaction information, purchase history, financial
                        details, and payment information
                      </td>
                      <td>NO</td>
                    </tr>
                    <tr>
                      <td>E. Biometric information</td>
                      <td>Fingerprints and voiceprints</td>
                      <td>NO</td>
                    </tr>
                    <tr>
                      <td>F. Internet or other similar network activity</td>
                      <td>
                        Browsing history, search history, online behavior,
                        interest data, and interactions with our and other
                        websites, applications, systems, and advertisements
                      </td>
                      <td>NO</td>
                    </tr>
                    <tr>
                      <td>G. Geolocation data</td>
                      <td>Device location</td>
                      <td>NO</td>
                    </tr>
                    <tr>
                      <td>
                        H. Audio, electronic, sensory, or similar information
                      </td>
                      <td>
                        Images and audio, video or call recordings created in
                        connection with our business activities
                      </td>
                      <td>NO</td>
                    </tr>
                    <tr>
                      <td>I. Professional or employment-related information</td>
                      <td>
                        Business contact details in order to provide you our
                        Services at a business level or job title, work history,
                        and professional qualifications if you apply for a job
                        with us
                      </td>
                      <td>NO</td>
                    </tr>
                    <tr>
                      <td>J. Education Information</td>
                      <td>Student records and directory information</td>
                      <td>NO</td>
                    </tr>
                    <tr>
                      <td>
                        K. Inferences drawn from collected personal information
                      </td>
                      <td>
                        Inferences drawn from any of the collected personal
                        information listed above to create a profile or summary
                        about, for example, an individual’s preferences and
                        characteristics
                      </td>
                      <td>NO</td>
                    </tr>
                    <tr>
                      <td>L. Sensitive personal Information</td>
                      <td> </td>
                      <td>NO</td>
                    </tr>
                  </tbody>
                </table>
              </figure>
              <p>
                We may also collect other personal information outside of these
                categories through instances where you interact with us in
                person, online, or by phone or mail in the context of:
              </p>
              <ul className="wp-block-list table-less-format">
                <li>Receiving help through our customer support channels;</li>
              </ul>
              <ul className="wp-block-list table-less-format">
                <li>Participation in customer surveys or contests; and</li>
              </ul>
              <ul className="wp-block-list table-less-format">
                <li>
                  Facilitation in the delivery of our Services and to respond to
                  your inquiries.
                </li>
              </ul>
              <p>
                <strong>Sources of Personal Information</strong>
              </p>
              <p>
                Learn more about the sources of personal information we collect
                in "<a href="#infocollect">WHAT INFORMATION DO WE COLLECT?</a>"
              </p>
              <p>
                <strong>How We Use and Share Personal Information</strong>
              </p>
              <p>
                Learn more about how we use your personal information in the
                section, "
                <a href="#infouse">HOW DO WE PROCESS YOUR INFORMATION?</a>"
              </p>
              <p>
                <strong>
                  Will your information be shared with anyone else?
                </strong>
              </p>
              <p>
                We may disclose your personal information with our service
                providers pursuant to a written contract between us and each
                service provider. Learn more about how we disclose personal
                information to in the section, "
                <a href="#whoshare">
                  WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
                </a>
                "
              </p>
              <p>
                We may use your personal information for our own business
                purposes, such as for undertaking internal research for
                technological development and demonstration. This is not
                considered to be "selling" of your personal information.
              </p>
              <p>
                We have not disclosed, sold, or shared any personal information
                to third parties for a business or commercial purpose in the
                preceding twelve (12) months. We will not sell or share personal
                information in the future belonging to website visitors, users,
                and other consumers.
              </p>
              <p>
                <strong>Your Rights</strong>
              </p>
              <p>
                You have rights under certain US state data protection laws.
                However, these rights are not absolute, and in certain cases, we
                may decline your request as permitted by law. These rights
                include:
              </p>
              <ul className="wp-block-list table-less-format">
                <li>
                  <strong>Right to know</strong> whether or not we are
                  processing your personal data
                </li>
              </ul>
              <ul className="wp-block-list table-less-format">
                <li>
                  <strong>Right to access </strong>your personal data
                </li>
              </ul>
              <ul className="wp-block-list table-less-format">
                <li>
                  <strong>Right to correct </strong>inaccuracies in your
                  personal data
                </li>
              </ul>
              <ul className="wp-block-list table-less-format">
                <li>
                  <strong>Right to request</strong> the deletion of your
                  personal data
                </li>
              </ul>
              <ul className="wp-block-list table-less-format">
                <li>
                  <strong>Right to obtain a copy </strong>of the personal data
                  you previously shared with us
                </li>
              </ul>
              <ul className="wp-block-list table-less-format">
                <li>
                  <strong>Right to non-discrimination</strong> for exercising
                  your rights
                </li>
              </ul>
              <ul className="wp-block-list table-less-format">
                <li>
                  <strong>Right to opt out</strong> of the processing of your
                  personal data if it is used for targeted advertising (or
                  sharing as defined under California’s privacy law), the sale
                  of personal data, or profiling in furtherance of decisions
                  that produce legal or similarly significant effects
                  ("profiling")
                </li>
              </ul>
              <p>
                Depending upon the state where you live, you may also have the
                following rights:
              </p>
              <ul className="wp-block-list table-less-format">
                <li>
                  Right to access the categories of personal data being
                  processed (as permitted by applicable law, including
                  Minnesota’s privacy law)
                </li>
              </ul>
              <ul className="wp-block-list table-less-format">
                <li>
                  Right to obtain a list of the categories of third parties to
                  which we have disclosed personal data (as permitted by
                  applicable law, including California's and Delaware's privacy
                  law)
                </li>
              </ul>
              <ul className="wp-block-list table-less-format">
                <li>
                  Right to obtain a list of specific third parties to which we
                  have disclosed personal data (as permitted by applicable law,
                  including Minnesota's and Oregon's privacy law)
                </li>
              </ul>
              <ul className="wp-block-list table-less-format">
                <li>
                  Right to review, understand, question, and correct how
                  personal data has been profiled (as permitted by applicable
                  law, including Minnesota’s privacy law)
                </li>
              </ul>
              <ul className="wp-block-list table-less-format">
                <li>
                  Right to limit use and disclosure of sensitive personal data
                  (as permitted by applicable law, including California’s
                  privacy law)
                </li>
              </ul>
              <ul className="wp-block-list table-less-format">
                <li>
                  Right to opt out of the collection of sensitive data and
                  personal data collected through the operation of a voice or
                  facial recognition feature (as permitted by applicable law,
                  including Florida’s privacy law)
                </li>
              </ul>
              <p>
                <strong>How to Exercise Your Rights</strong>
              </p>
              <p>
                To exercise these rights, you can contact us by submitting a{" "}
                <a
                  href="https://app.termly.io/notify/7b9b28fc-330b-43b3-a519-816ad5cdf3b5"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  data subject access request
                </a>
                , by emailing us at &nbsp;<a href="mailto:info@LaserBros.com">
                          info@LaserBros.com
                        </a>, by calling toll-free at
                919-495-2902, or by referring to the contact details at the
                bottom of this document.
              </p>
              <p>
                Under certain US state data protection laws, you can designate
                an authorized agent to make a request on your behalf. We may
                deny a request from an authorized agent that does not submit
                proof that they have been validly authorized to act on your
                behalf in accordance with applicable laws.
              </p>
              <p>
                <strong>Request Verification</strong>
              </p>
              <p>
                Upon receiving your request, we will need to verify your
                identity to determine you are the same person about whom we have
                the information in our system. We will only use personal
                information provided in your request to verify your identity or
                authority to make the request. However, if we cannot verify your
                identity from the information already maintained by us, we may
                request that you provide additional information for the purposes
                of verifying your identity and for security or fraud-prevention
                purposes.
              </p>
              <p>
                If you submit the request through an authorized agent, we may
                need to collect additional information to verify your identity
                before processing your request and the agent will need to
                provide a written and signed permission from you to submit such
                request on your behalf.
              </p>
              <p>
                <strong>Appeals</strong>
              </p>
              <p>
                Under certain US state data protection laws, if we decline to
                take action regarding your request, you may appeal our decision
                by emailing us at &nbsp;<a href="mailto:info@LaserBros.com">
                          info@LaserBros.com
                        </a>. We will inform you in
                writing of any action taken or not taken in response to the
                appeal, including a written explanation of the reasons for the
                decisions. If your appeal is denied, you may submit a complaint
                to your state attorney general.
              </p>
              <p>
                <strong>California "Shine The Light" Law</strong>
              </p>
              <p>
                California Civil Code Section 1798.83, also known as the "Shine
                The Light" law, permits our users who are California residents
                to request and obtain from us, once a year and free of charge,
                information about categories of personal information (if any) we
                disclosed to third parties for direct marketing purposes and the
                names and addresses of all third parties with which we shared
                personal information in the immediately preceding calendar year.
                If you are a California resident and would like to make such a
                request, please submit your request in writing to us by using
                the contact details provided in the section "
                <a href="#contact">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>
                "
              </p>
              <h5 className="mb-2" id="policyupdates"> 
                <strong>11. DO WE MAKE UPDATES TO THIS NOTICE?</strong>
              </h5>
              <p>
                <em>
                  <strong>In Short: </strong>Yes, we will update this notice as
                  necessary to stay compliant with relevant laws.
                </em>
              </p>
              <p>
                We may update this Privacy Notice from time to time. The updated
                version will be indicated by an updated "Revised" date at the
                top of this Privacy Notice. If we make material changes to this
                Privacy Notice, we may notify you either by prominently posting
                a notice of such changes or by directly sending you a
                notification. We encourage you to review this Privacy Notice
                frequently to be informed of how we are protecting your
                information.
              </p>
              <h5 className="mb-2" id="contact">
                <strong>12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</strong>
              </h5>
              <p>
                If you have questions or comments about this notice, you may
                email us at &nbsp;<a href="mailto:info@LaserBros.com">
                          info@LaserBros.com
                        </a> or contact us by post at:
              </p>
              <p>Van Welder LLC<br/>
              909 E Elm St<br/>
              Suite 102<br/>
              Graham, NC 27253<br/>
              United States<br/></p>
              <h5 className="mb-2" id="request">
                <strong>
                  13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT
                  FROM YOU?
                </strong>
              </h5>
              <p>
                Based on the applicable laws of your country or state of
                residence in the US, you may have the right to request access to
                the personal information we collect from you, details about how
                we have processed it, correct inaccuracies, or delete your
                personal information. You may also have the right to withdraw
                your consent to our processing of your personal information.
                These rights may be limited in some circumstances by applicable
                law. To request to review, update, or delete your personal
                information, please fill out and submit a{" "}
                <a
                  href="https://app.termly.io/notify/7b9b28fc-330b-43b3-a519-816ad5cdf3b5"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  data subject access request
                </a>
                .
              </p>
            </div>
            <div className="resources-pagination d-flex align-items-center justify-content-between">
                            <Link className="pagination-prev" to="/resources/shipping">
                                <span><Icon icon="streamline:next" /></span>
                                Payment Terms
                            </Link>
                            <Link className="pagination-next" to="/resources/refund-policy">
                                <span><Icon icon="streamline:next" /></span>
                                Refund Policy
                            </Link>
                        </div>
                    
          </div>
          
        </Col>
        {/* <Col lg={12} xl="auto" className="d-none d-xl-block width-258">
                    <div className="resources-right">
                        <h2>Table of Contents</h2>
                        <a href="#payment1">Personal Information We Collect</a>
                        <a href="#payment2">How Do We Use Your Personal Information?</a>
                        <a href="#payment3">Data Retention</a>
                        <a href="#payment4">Contact Us</a>
                    </div>
                </Col> */}
      </Row>
    </React.Fragment>
  );
}
