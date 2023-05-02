# Le _hook_ d'effet

Un effet (_side effect_, effet de bord, « effet secondaire »)
est, en gros, tout ce qui ne concerne pas React…

> [React Doc](https://react.dev/reference/react/useEffect)

Typiquement, on pourra y trouver :

- les appels API
- l'accès au DOM Réel
- la souscription à des services (chat…)
- la mise en place d'un _timer_ (`setTimeout`, `setInterval`)

L'idée est d'appelé une fonction à différents moments :

```text
useEffect(() => {
  console.log('Je suis la fonction appelée par le `useEffect`');
});
```

Ces différents moments correspondent aux phases principales
du **cycle de vie** du composant.

## _Lifecycle_

Cycle de vie d'un composant ; 3 phases principales :

- Montage (_mount_) : 1er rendu du composant
- Mise à jour (_update_)
- Démontage (_unmount_) : suppression du composant

Pour cibler, ces phases on va se servir du second paramètre (optionnel)
de `useEffect`, les **dépendances** (_dependencies_) :

- si on n'en a pas → appelé au 1er rendu ET à chaque modification de l'application

  ```js
  useEffect(() => {
    console.log('je suis appelé au 1er rendu ET à chaque modification');
  });
  ```

- pour cibler UNIQUEMENT le 1er rendu, le montage, je lui donne un `[]`

  ```js
  useEffect(() => {
    console.log('je suis appelé au 1er rendu UNIQUEMENT');
  }, []);
  ```

- `[propValue, stateValue]` nous permet d'appeler le _callback_
  au montage ET à la modification de CERTAINES VALEURS  
   → à chaque fois que `propValue` ou que `stateValue` sera modifié

      ```js
      useEffect(() => {
        console.log(
          'je suis appelé au 1er rendu ET à chaque modification de `count`'
        );
      }, [count]);
      ```

> <https://www.w3schools.com/react/react_useeffect.asp>

### Démontage (_unmount_)

Pour cibler, la suppression du composant, on va utiliser une autre instruction :
on va faire appel à une fonction de nettoyage (_clean up_).

Pour ce faire le _callback_ doit retourner une fonction ; c'est cette fonction
qui sera exécutée au démontage.

C'est très utile pour défaire cxe qu'on a fait dans le useEffect :

- se désabonner d'un service
- supprimer un écouteur d'évènement
- supprimer un _timer_

> voir l'exemple ci-dessous

## Exemple d'utilisation

**Objectif :** je veux donner le focus à mon champ de recherche
quand je clique sur `<body>`

```js
useEffect(() => {
  const onBodyClick = () => {
    document.querySelector('.currencies-search').focus();
  };
  document.body.addEventListener('click', onBodyClick);
});
```

**Problème 1 :** est-ce pertinent de créer l'écouteur d'évènement à chaque rendu ?

→ NON !

J'ajoute des dépendances : je veux cibler que le 1er rendu

```js
useEffect(() => {
  const onBodyClick = () => {
    document.querySelector('.currencies-search').focus();
  };
  document.body.addEventListener('click', onBodyClick);
}, []); // uniquement au 1er rendu
```

**Problème 2 :** quand je supprime le composant (avec le `<Toggler />`)
l'écouteur est toujours actif ; ça génère des erreurs à chaque clic !

→ je dois supprimer l'écouteur quand je supprime (démontage) le composant

Je le fais dans la fonction _clean up_ de `useEffect` ;
_i.e._ la fonction retournée par le callback de `useEffect

```js
useEffect(() => {
  const onBodyClick = () => {
    document.querySelector('.currencies-search').focus();
  };
  document.body.addEventListener('click', onBodyClick);

  /*
    Fonction appelée après la suppression du composant

    - exemple arrêter un setTimeout
    - se désabonner d'un service (ex : une chatroom)
    - supprimer un écouteur d'évènement (removeEventListener)
  */
  return () => {
    console.log('CURRENCIES > unmount');

    // je supprime l'écouteur
    document.body.removeEventListener('click', onBodyClick);
  };
}, []); // uniquement au 1er rendu
```
