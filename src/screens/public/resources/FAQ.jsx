// import React, { useState } from "react";
// import { Row, Col, Form, Accordion } from "react-bootstrap";
// import { Icon } from "@iconify/react";
// import { Link } from "react-router-dom";
// export default function FAQ() {
//     const [searchQuery, setSearchQuery] = useState('');
//   return (
//     <React.Fragment>
//       <Row>
//         {/* <Col lg={12} xl="auto" className="w-calc-100-258"> */}
//         <Col lg={12} xl={12}>
//           <div className="resources-body">
//             <div className="resources-heading mb-4">
//               <span>General</span>
//               <h1>Frequently Asked Questions{searchQuery}</h1>
//             </div>

//             <div className="resources-content mb-4" id="faq1">
//               <p>Here’s a list of our Frequently Asked Questions. </p>
//               <p>
//                 If you don’t see an answer to your question please reach out to
//                 us!
//               </p>
//               <Form.Group className="mb-2 searchfaq">
//                 <div className=" position-relative">
//                   <Icon icon="flowbite:search-solid" />
//                   <Form.Control
//                     type="text"
//                     placeholder="Search questions..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     style={{ paddingLeft: "30px" }} // Add padding to avoid overlap with the icon
//                   />
//                 </div>
//               </Form.Group>
//             </div>
//             <div className="resources-content mb-4" id="faq2">
//               <h2>Most Asked Questions</h2>
//               <Accordion>
//                 <Accordion.Item eventKey="0">
//                   <Accordion.Header>What is your lead time?</Accordion.Header>
//                   <Accordion.Body>
//                     Our typical lead time on laser cut parts is 2-5 business
//                     days. If you add services like bending this typically adds
//                     1-3 business days to the lead time. Other factors like
//                     number of parts will also impact the lead time of your
//                     parts.
//                   </Accordion.Body>
//                 </Accordion.Item>
//                 <Accordion.Item eventKey="1">
//                   <Accordion.Header>Where are you located?</Accordion.Header>
//                   <Accordion.Body>
//                     We are located in Graham, North Carolina!
//                   </Accordion.Body>
//                 </Accordion.Item>
//                 <Accordion.Item eventKey="2">
//                   <Accordion.Header>
//                     How do I add bending to my order?
//                   </Accordion.Header>
//                   <Accordion.Body>
//                     Bending is added by checking the bending services box. The
//                     pop-up will prompt you for the number of bends (this is the
//                     total number of bends on one part). You will need to upload
//                     a STEP file for the bent part too (this is for us to
//                     validate the bends). Alternatively you can upload a PDF
//                     drawing, but this method will take longer to validate and we
//                     cannot guarantee the accuracy of your part(s).
//                   </Accordion.Body>
//                 </Accordion.Item>
//                 <Accordion.Item eventKey="3">
//                   <Accordion.Header>Can I expedite my order?</Accordion.Header>
//                   <Accordion.Body>
//                     Yes! But, this is dependent on the material type, quantity
//                     of parts, and what our schedule is already like. Give us a
//                     call or email if you need your order expedited! Don’t forget
//                     you can select Next Day Air for next day delivery too.
//                   </Accordion.Body>
//                 </Accordion.Item>
//               </Accordion>
//             </div>
//             <div className="resources-content mb-4" id="faq2">
//               <h2>Laser Cutting</h2>
//               <Accordion>
//                 <Accordion.Item eventKey="0">
//                   <Accordion.Header>What is your lead time?</Accordion.Header>
//                   <Accordion.Body>
//                     Our typical lead time on laser cut parts is 2-5 business
//                     days. If you add services like bending this typically adds
//                     1-3 business days to the lead time. Other factors like
//                     number of parts will also impact the lead time of your
//                     parts.
//                   </Accordion.Body>
//                 </Accordion.Item>
//                 <Accordion.Item eventKey="1">
//                   <Accordion.Header>
//                     What thickness of sheet metal can be laser cut?
//                   </Accordion.Header>
//                   <Accordion.Body>
//                     This varies based on the material type and grade. We have a
//                     full list of the metals we stock and cut on our resource
//                     page.
//                   </Accordion.Body>
//                 </Accordion.Item>
//                 <Accordion.Item eventKey="2">
//                   <Accordion.Header>
//                     What material can be laser cut?
//                   </Accordion.Header>
//                   <Accordion.Body>
//                     We can laser cut almost any metallic material (no plastics,
//                     composites, or coated metals)
//                   </Accordion.Body>
//                 </Accordion.Item>
//                 <Accordion.Item eventKey="3">
//                   <Accordion.Header>
//                     What’s the largest sheet size you can cut?
//                   </Accordion.Header>
//                   <Accordion.Body>
//                     Our machines can handle sheets up to 60” x 120”. The cut
//                     area is typically 0.50” under those dimensions. Although,
//                     the material we stock is typically 48” x 96” in size.
//                   </Accordion.Body>
//                 </Accordion.Item>
//                 <Accordion.Item eventKey="4">
//                   <Accordion.Header>What are your tolerances?</Accordion.Header>
//                   <Accordion.Body>
//                     +/-0.005” or better. Thicker material will have some edge
//                     taper from the laser cutting process. We perform a QC part
//                     check on every order to make sure our settings are within
//                     tolerance (+/-0.003” is our QC tolerance).
//                   </Accordion.Body>
//                 </Accordion.Item>
//                 <Accordion.Item eventKey="5">
//                   <Accordion.Header>
//                     What are tabs or micro-joints?
//                   </Accordion.Header>
//                   <Accordion.Body>
//                     “tabs” or “micro-joints” are used to keep your parts in
//                     place while cutting. This keeps the part from falling out of
//                     the sheet or flipping up causing a collision with the laser
//                     head. We try to keep these as small as possible. If you have
//                     a specific location you’d like these “tabs” to be placed
//                     please let us know in the comment section of your order, or
//                     shoot us an email.
//                   </Accordion.Body>
//                 </Accordion.Item>
//                 <Accordion.Item eventKey="6">
//                   <Accordion.Header>
//                     What is the cut like? Will it have burrs?
//                   </Accordion.Header>
//                   <Accordion.Body>
//                     The cut edge varies based on material. Thicker steel will
//                     have an oxide edge from oxygen cutting. Stainless and thin
//                     steel will have a silver, oxide free edge since it’s cut
//                     with nitrogen. Aluminum will have a similar cut edge to
//                     stainless, but is cut on high pressure air. All unfinished
//                     parts will have a burr, it’s often minimal and easy to
//                     remove.
//                   </Accordion.Body>
//                 </Accordion.Item>
//                 <Accordion.Item eventKey="7">
//                   <Accordion.Header>
//                     What’s the smallest detail you can cut?
//                   </Accordion.Header>
//                   <Accordion.Body>
//                     A good rule of thumb is to keep the smallest detail to 50%
//                     of the material thickness. So 0.125” thickness should have
//                     0.063” details or larger. We have more details in our laser
//                     cutting resource area.
//                   </Accordion.Body>
//                 </Accordion.Item>
//                 <Accordion.Item eventKey="8">
//                   <Accordion.Header>
//                     What’s the smallest part you can cut?
//                   </Accordion.Header>
//                   <Accordion.Body>
//                     This depends on the material and thickness. Check out our
//                     laser cutting resource page for details.
//                   </Accordion.Body>
//                 </Accordion.Item>
//               </Accordion>
//             </div>
//             <div className="resources-content mb-4" id="faq2">
//               <h2>Bending</h2>
//               <Accordion>
//                 <Accordion.Item eventKey="0">
//                   <Accordion.Header>
//                     What types of bending processes do you offer?
//                   </Accordion.Header>
//                   <Accordion.Body>
//                     We offer CNC pressbrake services. Our current machine is a
//                     4-axis hydraulic machine with 110 TONS of force over a 120
//                     inch bed.
//                   </Accordion.Body>
//                 </Accordion.Item>
//                 <Accordion.Item eventKey="1">
//                   <Accordion.Header>
//                     How do I order mirrored parts?
//                   </Accordion.Header>
//                   <Accordion.Body>
//                     If a part is mirrored please upload them separately with
//                     their own STEP file and or PDF drawing.
//                   </Accordion.Body>
//                 </Accordion.Item>
//                 <Accordion.Item eventKey="2">
//                   <Accordion.Header>
//                     What is the maximum thickness and length of sheet metal that
//                     can be bent?
//                   </Accordion.Header>
//                   <Accordion.Body>
//                     With our current tooling we can offer 0.25” of steel @ 48”
//                     wide.
//                   </Accordion.Body>
//                 </Accordion.Item>
//                 <Accordion.Item eventKey="3">
//                   <Accordion.Header>
//                     What are your bending tolerances?
//                   </Accordion.Header>
//                   <Accordion.Body>
//                     Standard tolerances are +/-0.030” per bend. We can achieve
//                     tighter tolerances when needed, but it will often cost more
//                     to achieve this. With bending many factors come into play
//                     like material thickness and even grain direction of the
//                     parts. If you have a specific tolerance please let us know
//                     when you upload your bending docs on your order.
//                   </Accordion.Body>
//                 </Accordion.Item>
//                 <Accordion.Item eventKey="4">
//                   <Accordion.Header>
//                     What parameters do I use for bends?
//                   </Accordion.Header>
//                   <Accordion.Body>
//                     Check out our bending resource page! We have a chart of
//                     materials and bend parameters to help you get your parts
//                     designs dialed in. Using the correct design parameters is
//                     key to getting accurate sheet metal parts! If you need any
//                     help please reach out to us!
//                   </Accordion.Body>
//                 </Accordion.Item>
//                 <Accordion.Item eventKey="5">
//                   <Accordion.Header>
//                     What is the minimum flange length?
//                   </Accordion.Header>
//                   <Accordion.Body>
//                     Minimum flange length is the smallest flange that's allowed
//                     for a certain material and thickness. Anything smaller than
//                     this dimension will not be supported by the tooling die. The
//                     minimum flange is taken from the flat part, measured from
//                     the bend centerline to the edge of the part, this is the
//                     flange length you measure.
//                   </Accordion.Body>
//                 </Accordion.Item>
//                 <Accordion.Item eventKey="6">
//                   <Accordion.Header>
//                     What is the distortion zone?
//                   </Accordion.Header>
//                   <Accordion.Body>
//                     The distortion zone is an unsupported area of the part that
//                     may pull or deform during the bending process. This is
//                     measured from the bend centerline to the hole or part detail
//                     in question.
//                   </Accordion.Body>
//                 </Accordion.Item>
//                 <Accordion.Item eventKey="7">
//                   <Accordion.Header>
//                     How deep of a box can you bend?
//                   </Accordion.Header>
//                   <Accordion.Body>
//                     This will vary based on material selected. But 2.50” deep
//                     for standard tooling and 5.00” deep with our gooseneck
//                     tooling. This applies to boxes only. Channels can be bent
//                     deeper.
//                   </Accordion.Body>
//                 </Accordion.Item>
//                 <Accordion.Item eventKey="8">
//                   <Accordion.Header>
//                     How deep of a channel can you bend?
//                   </Accordion.Header>
//                   <Accordion.Body>
//                     A good rule of thumb is to not have side flanges taller than
//                     the base of the channel. So a 2” wide channel shouldn’t have
//                     sides taller than 2”. There is some variance to this. We’re
//                     happy to help you if you have a specific part you're
//                     interested in making with deep bends.
//                   </Accordion.Body>
//                 </Accordion.Item>
//               </Accordion>
//             </div>
//             <div className="resources-content mb-4" id="faq2">
//               <h2>Shipping</h2>
//               <Accordion>
//                 <Accordion.Item eventKey="0">
//                   <Accordion.Header>
//                     How is shipping calculated?
//                   </Accordion.Header>
//                   <Accordion.Body>
//                     Shipping is based on the size and weight of your parts. We
//                     will break your shipment up into multiple boxes if needed to
//                     keep the weight per box below 50 pounds. If a part is over a
//                     certain size or weight your order will switch to an RFQ; we
//                     will reach out to you about shipping options like LTL
//                     freight on parts like this.
//                   </Accordion.Body>
//                 </Accordion.Item>
//                 <Accordion.Item eventKey="1">
//                   <Accordion.Header>How do you ship LTL?</Accordion.Header>
//                   <Accordion.Body>
//                     We use Old Dominion Freight for our LTL freight. They have a
//                     great reputation and use their own trucks for liftgate
//                     deliveries too! They also have really quick shipping times
//                     along the east coast as well as the midwest and west coast.
//                   </Accordion.Body>
//                 </Accordion.Item>
//                 <Accordion.Item eventKey="2">
//                   <Accordion.Header>Why is shipping not FREE?</Accordion.Header>
//                   <Accordion.Body>
//                     We decided to keep shipping costs transparent. This also
//                     gives you the option to select other shipping methods like
//                     Overnight Air shipping.
//                   </Accordion.Body>
//                 </Accordion.Item>
//                 <Accordion.Item eventKey="3">
//                   <Accordion.Header>
//                     What is your shipping lead time?
//                   </Accordion.Header>
//                   <Accordion.Body>
//                     We have a shipping map in our resource page section. East
//                     coast orders should expect 1-2 days, midwest 2-3, and west
//                     coast 3-5 for standard shipping.
//                   </Accordion.Body>
//                 </Accordion.Item>
//                 <Accordion.Item eventKey="4">
//                   <Accordion.Header>
//                     What if my parts are damaged from shipping?
//                   </Accordion.Header>
//                   <Accordion.Body>
//                     This is unfortunate, but it happens. If your parts are
//                     damaged please shoot us an email @ info@LaserBros.com with
//                     pictures of the damage. We’ll work to replace the damaged
//                     parts and get them back to you as soon as possible!
//                   </Accordion.Body>
//                 </Accordion.Item>
//               </Accordion>
//             </div>
//             <div className="resources-pagination d-flex align-items-center justify-content-between">
//               <Link className="pagination-prev" to="/resources/specialty">
//                 <span>
//                   <Icon icon="streamline:next" />
//                 </span>
//                 Specialty
//               </Link>
//               <Link className="pagination-next" to="/resources/shipping">
//                 <span>
//                   <Icon icon="streamline:next" />
//                 </span>
//                 Shipping
//               </Link>
//             </div>
//           </div>
//         </Col>
//       </Row>
//     </React.Fragment>
//   );
// }
//
import React, { useEffect, useState } from "react";
import { Row, Col, Form, Accordion } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { generalFAQ } from "../../../api/api";

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [faqData, setFaqData] = useState([]);

  const getFaq = async () => {
    const res = await generalFAQ();
    const categoryMap = {
      0: "Most Asked Questions",
      1: "Laser Cutting",
      2: "Bending",
      3: "Shipping",
    };
  
    const categoryOrder = [
      "Most Asked Questions",
      "Laser Cutting",
      "Bending",
      "Shipping",
    ];
  
    const filteredFaqs = res.data;
  
    const groupedFaqs = filteredFaqs.reduce((acc, item) => {
      const categoryName = categoryMap[item.category] || "Other";
  
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
  
      acc[categoryName].push({
        question: item.question,
        answer: item.answer,
      });
  
      return acc;
    }, {});
  
    const formattedData = Object.entries(groupedFaqs)
      .map(([category, items]) => ({
        category,
        items,
      }))
      .sort((a, b) => {
        const indexA = categoryOrder.indexOf(a.category);
        const indexB = categoryOrder.indexOf(b.category);
        return indexA - indexB;
      });
  
    setFaqData(formattedData);
  };

useEffect(() => {
  getFaq();
}, []);

  // Filtered FAQs based on search query
  const filteredFAQs = faqData
  .map((category) => ({
    ...category,
    items: category.items.filter(
      (item) =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }))
  .filter((category) => category.items.length > 0);

  return (
    <React.Fragment>
      <Row>
        <Col lg={12} xl={12}>
          <div className="resources-body">
            <div className="resources-heading mb-4">
              <span>General</span>
              <h1>Frequently Asked Questions</h1>
            </div>
            <div className="resources-content mb-4">
              <p>
                Here’s a list of our Frequently Asked Questions.
                <br />
                If you don’t see an answer to your question please reach out to
                us!
              </p>
              <Form.Group className="mb-2 searchfaq">
                <div className="position-relative">
                  <Icon icon="flowbite:search-solid" />
                  <Form.Control
                    type="text"
                    placeholder="Search questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ paddingLeft: "30px" }} // Add padding to avoid overlap with the icon
                  />
                </div>
              </Form.Group>
            </div>

            {/* Dynamically Render Filtered FAQs */}
            {filteredFAQs.map((category, index) => (
              <div className="resources-content mb-4" key={index}>
                <h2>{category.category}</h2>
                <Accordion>
                  {category.items.map((item, itemIndex) => (
                    <Accordion.Item
                      eventKey={itemIndex.toString()}
                      key={itemIndex}
                    >
                      <Accordion.Header>{item.question}</Accordion.Header>
                      <Accordion.Body>{item.answer}</Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
            ))}

            {/* No Results Found */}
            {filteredFAQs.length === 0 && (
              <div className="resources-content mb-4">
                <h2>No Questions Found</h2>
                <p>
                  Try searching for a different question or browse the
                  categories above.
                </p>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
}
