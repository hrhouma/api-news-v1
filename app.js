const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');


const app = express();

// Utilisation de CORS pour permettre les requêtes provenant d'autres origines
app.use(cors());

// Configuration de Swagger
const options = {
  definition: {
    openapi: '3.0.0', // Version d'OpenAPI
    info: {
      title: 'News API',
      version: '1.0.0',
      description: 'API pour accéder aux nouvelles par divers filtres',
    },
  },
  apis: ['./app.js'], // Emplacement des annotations de documentation
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Indique à Express de rendre ce dossier public accessible au public
app.use(express.static('public'));

// Permet au serveur de lire le JSON
app.use(bodyParser.json());

// Variable contenant toutes les nouvelles
const news = require('./newslight');

/**
 * @openapi
 * /news:
 *   get:
 *     summary: Obtient toutes les nouvelles
 *     description: Retourne un tableau de toutes les nouvelles disponibles.
 *     responses:
 *       200:
 *         description: Un tableau de nouvelles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   category:
 *                     type: string
 *                   headline:
 *                     type: string
 *                   authors:
 *                     type: string
 *                   link:
 *                     type: string
 *                   short_description:
 *                     type: string
 *                   date:
 *                     type: string
 */
app.get('/news', (req, res) => {
    res.json(news);
});

/**
 * @openapi
 * /news/random:
 *   get:
 *     summary: Obtient une nouvelle aléatoire
 *     description: Retourne une nouvelle choisie aléatoirement dans le tableau.
 *     responses:
 *       200:
 *         description: Une nouvelle aléatoire
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   category:
 *                     type: string
 *                   headline:
 *                     type: string
 *                   authors:
 *                     type: string
 *                   link:
 *                     type: string
 *                   short_description:
 *                     type: string
 *                   date:
 *                     type: string
 */
app.get('/news/random', (req, res) => {
    let randomNews = Math.floor(Math.random() * news.length);
    res.json(news[randomNews]);
});

/**
 * @openapi
 * /news/by-id/{id}:
 *   get:
 *     summary: Obtient une nouvelle par ID
 *     description: Retourne la nouvelle correspondante à l'ID spécifié.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la nouvelle
 *     responses:
 *       200:
 *         description: Une nouvelle spécifique
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   category:
 *                     type: string
 *                   headline:
 *                     type: string
 *                   authors:
 *                     type: string
 *                   link:
 *                     type: string
 *                   short_description:
 *                     type: string
 *                   date:
 *                     type: string
 *       404:
 *         description: Nouvelle non trouvée
 */
app.get("/news/by-id/:id", (req, res) => {
    const index = parseInt(req.params.id, 10) - 1;
    if (index >= 0 && index < news.length) {
        res.json(news[index]);
    } else {
        res.status(404).send('Nouvelle non trouvée');
    }
});


/**
 * @openapi
 * /news/by-date/{date}:
 *   get:
 *     summary: Obtient les nouvelles par date
 *     description: Retourne toutes les nouvelles correspondant à une date spécifique.
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: La date des nouvelles à récupérer
 *     responses:
 *       200:
 *         description: Liste des nouvelles de la date spécifiée
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   category:
 *                     type: string
 *                   headline:
 *                     type: string
 *                   authors:
 *                     type: string
 *                   link:
 *                     type: string
 *                   short_description:
 *                     type: string
 *                   date:
 *                     type: string
 *       404:
 *         description: Aucune nouvelle trouvée pour cette date
 */
app.get("/news/by-date/:date", (req, res) => {
    const filteredNews = news.filter(n => n.date === req.params.date);
    if (filteredNews.length > 0) {
        res.json(filteredNews);
    } else {
        res.status(404).send('Aucune nouvelle trouvée pour cette date');
    }
});

/**
 * @openapi
 * /news/by-category/{category}:
 *   get:
 *     summary: Obtient les nouvelles par catégorie
 *     description: Retourne toutes les nouvelles correspondant à une catégorie spécifique.
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: La catégorie des nouvelles à récupérer
 *     responses:
 *       200:
 *         description: Liste des nouvelles de la catégorie spécifiée
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   category:
 *                     type: string
 *                   headline:
 *                     type: string
 *                   authors:
 *                     type: string
 *                   link:
 *                     type: string
 *                   short_description:
 *                     type: string
 *                   date:
 *                     type: string
 *       404:
 *         description: Aucune nouvelle trouvée pour cette catégorie
 */
app.get("/news/by-category/:category", (req, res) => {
    const filteredNews = news.filter(n => n.category === req.params.category);
    if (filteredNews.length > 0) {
        res.json(filteredNews);
    } else {
        res.status(404).send('Aucune nouvelle trouvée pour cette catégorie');
    }
});

/**
 * @openapi
 * /news/by-author/{author}:
 *   get:
 *     summary: Obtient les nouvelles par auteur
 *     description: Retourne toutes les nouvelles écrites par un auteur spécifique.
 *     parameters:
 *       - in: path
 *         name: author
 *         required: true
 *         schema:
 *           type: string
 *         description: Nom complet de l'auteur pour récupérer ses nouvelles
 *     responses:
 *       200:
 *         description: Liste des nouvelles de l'auteur spécifié
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   category:
 *                     type: string
 *                   headline:
 *                     type: string
 *                   authors:
 *                     type: string
 *                   link:
 *                     type: string
 *                   short_description:
 *                     type: string
 *                   date:
 *                     type: string
 *       404:
 *         description: Aucune nouvelle trouvée pour cet auteur
 */
app.get("/news/by-author/:author", (req, res) => {
    const authorName = decodeURIComponent(req.params.author);
    const filteredNews = news.filter(n => n.authors === authorName);
    if (filteredNews.length > 0) {
        res.json(filteredNews);
    } else {
        res.status(404).send('Aucune nouvelle trouvée pour cet auteur');
    }
});

/**
 * @openapi
 * /news/by-author-partial/{partialAuthor}:
 *   get:
 *     summary: Obtient les nouvelles par partie du nom de l'auteur
 *     description: Retourne toutes les nouvelles dont le nom de l'auteur contient la sous-chaîne spécifiée.
 *     parameters:
 *       - in: path
 *         name: partialAuthor
 *         required: true
 *         schema:
 *           type: string
 *         description: Partie du nom de l'auteur pour récupérer ses nouvelles
 *     responses:
 *       200:
 *         description: Liste des nouvelles correspondant à la partie du nom de l'auteur
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   category:
 *                     type: string
 *                   headline:
 *                     type: string
 *                   authors:
 *                     type: string
 *                   link:
 *                     type: string
 *                   short_description:
 *                     type: string
 *                   date:
 *                     type: string
 *       404:
 *         description: Aucune nouvelle trouvée pour cette sous-chaîne de nom d'auteur
 */
app.get("/news/by-author-partial/:partialAuthor", (req, res) => {
    const partialAuthor = decodeURIComponent(req.params.partialAuthor).toLowerCase();
    const filteredNews = news.filter(n => n.authors.toLowerCase().includes(partialAuthor));
    if (filteredNews.length > 0) {
        res.json(filteredNews);
    } else {
        res.status(404).send('Aucune nouvelle trouvée pour cet auteur partiel');
    }
});



app.listen(5000, () => {
    console.log('Écoute sur le port 5000');
});
