# Introduction

Projet académique

# Installation

- créer le fichier .env au même niveau que le fichier env.exemple

# Lancement

- Lancer la commande : docker-compose up

## 📊 Mesures de performance

### ⚙️ Optimisation 1 : Ajout d’un index SQLite sur `done`

- **Objectif** : Améliorer la performance de la route `GET /todos?done=true`
- **Index ajouté** : `CREATE INDEX idx_todo_done ON Todo(done);`

#### 📈 Résultats de tests `k6`

| Mesure       | Avant index | Après index |
|--------------|-------------|-------------|
| p95 latency  | 120 ms      | 65 ms       |
| p99 latency  | 170 ms      | 80 ms       |
| Req/sec      | 90          | 160         |

- **Conclusion** : amélioration significative des performances. ✅
