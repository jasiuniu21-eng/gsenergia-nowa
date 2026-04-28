import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  ui: {
    brand: {
      name: "GS Energia CMS",
    },
    navigation: {
      Treści: ["posts", "uslugi", "realizacje"],
    },
  },
  collections: {
    posts: collection({
      label: "Blog",
      slugField: "title",
      path: "content/posts/*",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["title", "date"],
      schema: {
        title: fields.slug({
          name: { label: "Tytuł", validation: { length: { min: 4 } } },
          slug: { label: "Slug URL" },
        }),
        date: fields.date({
          label: "Data publikacji",
          defaultValue: { kind: "today" },
        }),
        excerpt: fields.text({
          label: "Zajawka (excerpt)",
          description: "1-2 zdania — pokazuje się na liście bloga i w Google",
          multiline: true,
        }),
        categories: fields.array(
          fields.text({ label: "Kategoria" }),
          { label: "Kategorie", itemLabel: (p) => p.value }
        ),
        tags: fields.array(
          fields.text({ label: "Tag" }),
          { label: "Tagi", itemLabel: (p) => p.value }
        ),
        content: fields.mdx({
          label: "Treść artykułu",
          options: {
            image: {
              directory: "public/media/uploads",
              publicPath: "/media/uploads/",
            },
          },
        }),
      },
    }),

    uslugi: collection({
      label: "Usługi",
      slugField: "title",
      path: "content/uslugi/*",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["title", "date"],
      schema: {
        title: fields.slug({
          name: { label: "Tytuł usługi" },
          slug: { label: "Slug URL" },
        }),
        date: fields.date({
          label: "Data",
          defaultValue: { kind: "today" },
        }),
        metaTitle: fields.text({
          label: "Meta title (SEO)",
          description: "Używany w Google — max 60 znaków",
        }),
        excerpt: fields.text({
          label: "Krótki opis",
          multiline: true,
        }),
        faq: fields.array(
          fields.object({
            question: fields.text({ label: "Pytanie" }),
            answer: fields.text({ label: "Odpowiedź", multiline: true }),
          }),
          {
            label: "FAQ (pytania i odpowiedzi)",
            itemLabel: (p) => p.fields.question.value || "Nowe pytanie",
          }
        ),
        content: fields.mdx({
          label: "Treść",
          options: {
            image: {
              directory: "public/media/uploads",
              publicPath: "/media/uploads/",
            },
          },
        }),
      },
    }),

    realizacje: collection({
      label: "Realizacje",
      slugField: "title",
      path: "content/realizacje/*",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["title", "date"],
      schema: {
        title: fields.slug({
          name: { label: "Nazwa realizacji" },
          slug: { label: "Slug URL" },
        }),
        date: fields.date({
          label: "Data",
          defaultValue: { kind: "today" },
        }),
        client: fields.text({ label: "Klient" }),
        projectType: fields.text({ label: "Typ projektu" }),
        savingsPercent: fields.number({
          label: "Oszczędności (%)",
        }),
        roiMonths: fields.number({
          label: "ROI (miesiące)",
        }),
        excerpt: fields.text({
          label: "Krótki opis",
          multiline: true,
        }),
        content: fields.mdx({
          label: "Treść",
          options: {
            image: {
              directory: "public/media/uploads",
              publicPath: "/media/uploads/",
            },
          },
        }),
      },
    }),
  },
});
