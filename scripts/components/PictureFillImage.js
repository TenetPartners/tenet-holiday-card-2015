/*
 <PictureFillImage/>
 */

import React from 'react'

class PictureFillImage extends React.Component {

    constructor() {
      super();
      this.state = {
          surveyClosed: false
      }
    }

    render() {
        return (
            <div>
                <picture>
                    {/*srcset="1x image path.jpg, 2ximagepath.jpg 2x*/}
                    <img srcset="" alt="Business cards" />
                </picture>
                <noscript>
                    <img className="picture" src="" alt=""/>
                </noscript>
            </div>
        )
    }
}

export default PictureFillImage;
