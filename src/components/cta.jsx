import React from "react";
import {
  Container
} from 'react-bootstrap'
import { Icon } from '@iconify/react';
const CTA = () => {
  return (
    <section className="cta">
    <Container>
      <div className="heading text-center mb-5">
        <h2 className="text-capitalize">Are you ready to try Laser Bros?</h2>
      </div>
      <div className="banner-upload-file max-width-810 mx-auto text-center">
         <Icon icon="mage:file-plus" />
         <p><label htmlFor="uploadfile">Browse Files</label><input type="file" id="uploadfile" name="uploadfile" className="d-none" /><span> or Drag or Drop</span></p>
         <small> We accept DXF files for instant quotes</small>
       </div>
    </Container>
 </section>
  )
};
export default CTA;