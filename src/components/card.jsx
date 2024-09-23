import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import { useNavigate } from "react-router-dom";


function VideoCard({data}, {key}) {
  const navigate = useNavigate()
  return (
      <Card key={key} style={{ height: '17rem' }}  className="box" onClick={(() => navigate(`/video?id=${data.ID}`))}>
        <Card.Img variant="top" src={data.thumbnail} />
        <Card.Body>
          <Card.Title>{data.name}</Card.Title>
          <Card.Subtitle>
            Uploader: {data.owner}
          </Card.Subtitle>
          <Card.Subtitle>
            {(data.length / 60).toFixed(2)} mins | {data.fileType} | {(Math.round(data.size * 100) / 100).toFixed(2)} MB
          </Card.Subtitle>
        </Card.Body>
      </Card>
  );
}

export default VideoCard;