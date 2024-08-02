**To run:**

```
npm run dev
```

**For all Supabase mutations (SELECT, INSERT, DELETE, UPDATE, etc.)**

Use @supabase-cache-helpers/postgres-swr:

Example: Select

```
useQuery(

)
```

Example: Insert

```
useInsertMutation(
supabase.from("table_here"),
[],
""
)
```

Refer to this documentation for more: link_here

All Icons are from lucide-react

For .env files create a .env.local file and enter the below keys:

```
NEXT_PUBLIC_SUPABASE_URL=<VALUE_HERE>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<VALUE_HERE>
```

For Design:

- Use global css values from shadcn for it to adapt
  refer to them in gloabals.css

DO THIS:

```
✅ <Button className="text-foreground"></Button>
```

DON'T DO THIS:

```
❌ <Button className="text-white"></Button>
```

ARCHITECTURE:

- try to avoid using api routes, instead use server actions

NOTE:
page.tsx is in (public) for navbar, you can move out if you want.
