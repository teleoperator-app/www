import { rest } from 'msw';

const BASE_URL = 'https://api.example.com';

export const handlers = [
    rest.get(`${BASE_URL}/installers`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                { id: 1, name: 'Installer 1', region: 'Warsaw', rating: 4.5, cost: '200-400 PLN' },
                { id: 2, name: 'Installer 2', region: 'Krakow', rating: 4.0, cost: '180-350 PLN' },
                { id: 3, name: 'Installer 3', region: 'Gdansk', rating: 5.0, cost: '220-450 PLN' },
            ])
        );
    }),
    rest.get(`${BASE_URL}/products`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                { id: 1, name: 'Camera Model A', description: 'High quality camera', price: '400 PLN' },
                { id: 2, name: 'Camera Model B', description: 'Budget-friendly camera', price: '200 PLN' },
                { id: 3, name: 'DVR System', description: 'Advanced recording system', price: '800 PLN' },
            ])
        );
    }),
];
