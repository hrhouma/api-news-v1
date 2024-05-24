# Swagger :
- http://localhost:5000/api-docs/

# Exemples d'URL que vous pouvez utiliser pour tester les différents endpoints de notre API News :

1. **Obtenir toutes les nouvelles** :
   ```
   http://localhost:5000/news
   ```

2. **Obtenir une nouvelle aléatoire** :
   ```
   http://localhost:5000/news/random
   ```

3. **Obtenir une nouvelle par ID** (exemple avec l'ID 5) :
   ```
   http://localhost:5000/news/by-id/5
   ```

4. **Obtenir les nouvelles par date** (exemple avec la date du 26 mai 2018) :
   ```
   http://localhost:5000/news/by-date/2018-05-26
   ```

5. **Obtenir les nouvelles par catégorie** (exemple avec la catégorie 'ENTERTAINMENT') :
   ```
   http://localhost:5000/news/by-category/ENTERTAINMENT
   ```

6. **Obtenir les nouvelles par auteur** (exemple avec l'auteur 'Ron Dicker') :
   ```
   http://localhost:5000/news/by-author/Ron%20Dicker
   ```

7. **Obtenir les nouvelles par partie du nom de l'auteur** (exemple avec la sous-chaîne 'ro' qui devrait inclure 'Ron Dicker') :
   ```
   http://localhost:5000/news/by-author-partial/ro
   ```
