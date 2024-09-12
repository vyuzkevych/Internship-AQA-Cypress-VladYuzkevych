import { faker } from "@faker-js/faker";

const productData = {
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
    image: faker.image.url(),
    category: faker.commerce.department()
}

export default productData;