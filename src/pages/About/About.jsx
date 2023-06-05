import { Card } from "react-bootstrap";

const About = () => (
  <div className="pt-3 mt-5 d-flex justify-content-center align-items-center flex-column">
    <Card className="w-100 mt-3 m-auto">
      <Card.Header>John Doe</Card.Header>
      <Card.Body>
        <Card.Text>test@test.com</Card.Text>
        <Card.Text>john_doe</Card.Text>
        <Card.Text>+111111</Card.Text>
        <Card.Text>john_doe.com</Card.Text>
        <Card.Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed dolores
          excepturi vero nemo nobis fugit aspernatur incidunt asperiores beatae,
          doloribus fugiat numquam temporibus ex laborum cupiditate hic ducimus
          itaque laudantium autem deserunt dolorem aliquid eos rerum amet!
          Natus, repellendus? Et at, ex libero omnis, sed quisquam ad earum fuga
          quo ipsum in veniam delectus consequatur error quibusdam hic dolorem
          neque saepe! Eius possimus numquam mollitia quo consequatur voluptate
          animi deserunt neque cum quam voluptas, dolore accusamus laboriosam
          esse fugiat porro dolorum nam fuga, velit non quod. Ipsam soluta
          consectetur laudantium repudiandae quisquam tenetur commodi incidunt
          cupiditate facere vitae. Adipisci, rem?
        </Card.Text>
      </Card.Body>
    </Card>
  </div>
);

export default About;
