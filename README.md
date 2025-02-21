# Recipe Summariser

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## TODO

- [x] Authentication
    - [ ] Tidy up magic link templates
- [ ] Recipe library
    - [x] Save recipe
    - [x] Duplicate recipe
    - [x] Delete recipe
    - [ ] Edit recipe
        - [x] Title
        - [x] Ingredients
        - [x] Instructions
        - [ ] Servings
        - [ ] Image
- [x] Export/Share
- [ ] Language settings
- [ ] Search
    - [x] Paste url from clipboard
    - [ ] Query
        - [ ] Google search
        - [ ] Direct sources, eg serious eats, justonecookbook
        - [ ] Filters
            - [ ] Type
            - [ ] Source
            - [ ] Ingredients

### Bugs

- Redirect to the previous page after a successful login
