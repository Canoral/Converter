# Appel API dans React

- on crée une variable d'état qui stockera nos données  
  → `useState` initialisé à `undefined`, `null`…

- on prépare un useEffect pour notre appel

  - évite les boucles infinies
  - on réfléchit aux dépendances du `useEffet`  
    → quand je dois faire mon appel :

    - uniquement au 1er rendu : `[]` (ex : récupérer les devises)
    - au 1er rendu ET à la modification d'un état → `[state]` (ex : calcul)

- on fait notre appel  
  → `fetch` ou `axios`

- on enregistre nos résultats dans la variable d'état  
  → `setData(response)`

## Loading

Pendant notre appel, on peut prévenir l'utilisateur qu'on fait
quelque chose avec un état de loading.

L'idée :

- variable d'état `const [isLoading, setIsLoading] = useState(false);`
- juste avant le `fetch` → `setIsLoading(true);`

  - mise à jour de l'interface → vue conditionnelle pour « Chargement » ou image

- quand l'appel est fini (succès ou erreur), on repasse `isLoading` à `false`  
   → `finally`

```js
try {
  setIsLoading(true);
  const resp = await fetch(...);

  setData(response.data);
} catch(error) {
  // ...
} finally {
  setIsLoading(false);
}
```
