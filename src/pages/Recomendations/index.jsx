import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  font-family: "Public Sans", sans-serif;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const CardContent = styled.div`
  font-size: 14px;
  line-height: 1.6;
  color: #333;
`;

const Paragraph = styled.p`
  margin-bottom: 10px;
`;

const List = styled.ul`
  margin-left: 20px;
  margin-bottom: 10px;
`;

const ListItem = styled.li`
  margin-bottom: 5px;
`;

const Recommedations = () => {
  return (
    <Container>
      <Title>Recommedations</Title>
      <CardContainer>
        <Card>
          <CardTitle>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim
            mollitia autem ratione assumenda, nostrum voluptatibus modi
            accusamus, temporibus impedit voluptatem, id ipsam quos! Maxime sit
            vitae iste consequatur voluptas autem.
          </CardTitle>
          <CardContent>
            <Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur necessitatibus inventore molestiae sit, dolorem
              repellendus neque quas autem harum et saepe magni accusamus
              placeat tempora maiores voluptas officia enim blanditiis!
            </Paragraph>
            <Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              fugiat laboriosam nostrum corporis laborum veniam dolore
              doloremque iusto debitis, quam, architecto ratione molestiae
              impedit vitae sunt qui in culpa suscipit!
            </Paragraph>
          </CardContent>
        </Card>
        <Card>
          <CardTitle>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim
            mollitia autem ratione assumenda, nostrum voluptatibus modi
            accusamus, temporibus impedit voluptatem, id ipsam quos! Maxime sit
            vitae iste consequatur voluptas autem.
          </CardTitle>
          <CardContent>
            <Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur necessitatibus inventore molestiae sit, dolorem
              repellendus neque quas autem harum et saepe magni accusamus
              placeat tempora maiores voluptas officia enim blanditiis!
            </Paragraph>
            <Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              fugiat laboriosam nostrum corporis laborum veniam dolore
              doloremque iusto debitis, quam, architecto ratione molestiae
              impedit vitae sunt qui in culpa suscipit!
            </Paragraph>
          </CardContent>
        </Card>
        <Card>
          <CardTitle>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim
            mollitia autem ratione assumenda, nostrum voluptatibus modi
            accusamus, temporibus impedit voluptatem, id ipsam quos! Maxime sit
            vitae iste consequatur voluptas autem.
          </CardTitle>
          <CardContent>
            <Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur necessitatibus inventore molestiae sit, dolorem
              repellendus neque quas autem harum et saepe magni accusamus
              placeat tempora maiores voluptas officia enim blanditiis!
            </Paragraph>
            <Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              fugiat laboriosam nostrum corporis laborum veniam dolore
              doloremque iusto debitis, quam, architecto ratione molestiae
              impedit vitae sunt qui in culpa suscipit!
            </Paragraph>
          </CardContent>
        </Card>
        <Card>
          <CardTitle>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim
            mollitia autem ratione assumenda, nostrum voluptatibus modi
            accusamus, temporibus impedit voluptatem, id ipsam quos! Maxime sit
            vitae iste consequatur voluptas autem.
          </CardTitle>
          <CardContent>
            <Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur necessitatibus inventore molestiae sit, dolorem
              repellendus neque quas autem harum et saepe magni accusamus
              placeat tempora maiores voluptas officia enim blanditiis!
            </Paragraph>
            <Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              fugiat laboriosam nostrum corporis laborum veniam dolore
              doloremque iusto debitis, quam, architecto ratione molestiae
              impedit vitae sunt qui in culpa suscipit!
            </Paragraph>
          </CardContent>
        </Card>
      </CardContainer>
    </Container>
  );
};

export default Recommedations;
