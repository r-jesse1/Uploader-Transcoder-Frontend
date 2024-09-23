import VideoCard from "./card";

import {
    Row, Col, Container, Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
    Table,
    Spinner
  } from "reactstrap";




function VideoStack({data}) {

    const videos = [];
    for (let i = 0; i < data.length; i++) {

        videos.push(
            <Col>
                <VideoCard key={data.id} data={data[i]}/>
            </Col>
        );
    }

    return (
    <Container>
        <Row>
            {videos}
            </Row>
    </Container>
    )

}

export default VideoStack;