import React from 'react'

const TermsSection = () => {
  return (
    
        <div>

            <header className='yellow-bg'>
        <div className="container" style={{paddingTop:"130px"}}>
          <div className="row">
            <div className="col-xs-12">
              {/* <h2 className="title" style={{color:"#333"}}>Terms and Conditions</h2> */}
              {/* <h5 className="sub-title" style={{color:"#333"}}>Just say hi! You are always welcome</h5> */}
            </div>
          </div>
        </div>
      </header>


         <div className="container mt-5 pt-5 terms-wrap">
        <h2 className='tearm-wrap'>Terms and Conditions</h2>
        <div className='data-wrap-terms'>
        <h4 >1.1 Termination of Services:</h4>
        <p> Services may be suspended or terminated if payments are 
not received within [] after the due date.</p>
        </div>

        <div className='data-wrap-terms'>
        <h4>1.2 Refunds:</h4>
        <p>No refunds will be provided for services once they have commenced. In 
the case of early termination of services, prorated charges for the services rendered 
up to that point will be due.</p>
        </div>
        
        <div className='data-wrap-terms'>
        <h4>1.3 Payment Methods</h4>
        <p> <b>International Clients:</b> Payments must be made in USD, GBP, or EUR via 
wire transfer, PayPal, or any other mutually agreed-upon method.</p>
<p>  <b>Indian Clients:</b> Payments must be made in INR via bank transfer, UPI, or 
any other mutually agreed-upon method.</p>
<p>  Additional Services: Any additional services requested by the Client outside the 
scope of this Contract will be billed separately at an agreed-upon rate.</p>
        </div>
        
        <div className='data-wrap-terms'>
        <h4>1.4 Addi<b></b>tional Charges & Expenses.</h4>
        <p>Pre-approved Expenses: The Consultant may incur additional expenses (e.g., paid 
advertising, stock images, software subscriptions) necessary to complete the 
project. These expenses must be pre-approved by the Client in writing. The Client 
agrees to reimburse the Consultant for these expenses upon presentation of 
receipts.</p>
<p><b>Revisions:</b> The Client is entitled to 2 rounds of revisions for content and strategy. 
Additional revisions beyond this scope will incur additional charges.</p>
        </div>
        <div className='data-wrap-terms'>
        <h4>1.5 Invoices.</h4>
        <p><b>Invoicing Schedule:</b> The Consultant will issue invoices monthly for ongoing 
services. The Client agrees to pay the full amount of the invoice within 5 business 
days of receipt.</p>
<p><b>Dispute Resolution:</b> If the Client disputes any part of an invoice, the Client must 
notify the Consultant within 3 business days of receiving the invoice, specifying the 
disputed amount and the reasons for the dispute. The undisputed portion of the 
invoice must be paid by the due date.</p>
        </div>

        <div className='data-wrap-terms'>
        <h4>1.6 Late payments</h4>
        <p>•Payment Plan Requirement: If payment is not received within the specified timeframe, 
the client may be required to enter into a payment plan to settle the outstanding balance. 
Failure to adhere to the agreed payment plan may result in suspension of services.</p>
<p>
    Service Suspension: If payment is delayed by more than 10 days, the Consultant 
reserves the right to suspend services until payment is made. Continuous delays 
may result in the termination of the Contract
</p>
        </div>

         <div className='data-wrap-terms'>
        <h4>1.7 Support</h4>
        <p>•Ongoing Support: The Consultant will provide ongoing support related to social 
media management during the term of this Contract. Support includes responding 
to queries, making minor adjustments, and providing guidance as needed.</p>
<p>
            Post-Project Support: Once the Contract ends, the Consultant is not obligated to 
provide further support unless otherwise agreed upon in writing. Any additional 
support requested by the Client will be billed at the Consultant’s standard hourly 
rate.
</p>
        </div>

        <div className='data-wrap-terms'>
        <h4>8. Intellectual Property</h4>
        <p>All content on our website, including text, images, logos, and graphics, is the property of Welgate or its licensors and is protected by copyright and intellectual property laws.</p>
        </div>

        <div className='data-wrap-terms'>
        <h4>9. Prohibited Activities</h4>
        <p>You agree not to:</p>
        <ul>
            <li>Use our website for unlawful purposes.</li>
            <li>Interfere with or disrupt the functionality of our website.</li>
            <li>Violate any applicable laws or regulations.</li>
        </ul>
        </div>

        <div className='data-wrap-terms'>
        <h4>10. Disclaimer of Warranties</h4>
        <p>Our website and services are provided on an "as is" basis without warranties of any kind. We disclaim all warranties, express or implied, including merchantability and fitness for a particular purpose.</p>
        </div>

         <div className='data-wrap-terms'>
        <h4>11. Limitation of Liability</h4>
        <p>To the maximum extent permitted by law, Welgate is not liable for any indirect, incidental, or consequential damages arising from your use of our website.</p>
        </div>

         <div className='data-wrap-terms'>
        <h4>12. Changes to Terms</h4>
        <p>We reserve the right to modify these Terms at any time. Any changes will be posted on this page, and your continued use of our website constitutes acceptance of the revised Terms.</p>
        </div>

          <div className='data-wrap-terms'>
        <h4>13. Governing Law</h4>
        {/* <p>These Terms are governed by the laws of [Insert Jurisdiction]. Any disputes will be resolved in the courts of [Insert Jurisdiction].</p> */}

        <p>These Terms are governed by and construed in accordance with the laws of the jurisdiction where the contract is performed.</p>


        {/* <h4>14. Contact Information</h4>
        <p>If you have any questions or concerns about these Terms, please contact us at:</p>
        <p>Email: support@[yourwebsite].com</p>
        <p>Phone: [Your Phone Number]</p>

        <p>Thank you for using [Your Website Name]!</p> */}
        </div>
    </div>
    </div>
    
  )
}

export default TermsSection
