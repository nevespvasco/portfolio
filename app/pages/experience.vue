<template>
  <UiPageContainer>
    <h1 class="title">Experience</h1>
    <p class="intro">Where I have worked, most recent first.</p>

    <ol class="timeline">
      <li v-for="role in roles" :key="`${role.company}-${role.start}`">
        <article class="role">
          <h2 class="company">{{ role.company }}</h2>
          <p class="role-title">{{ role.title }}</p>
          <p class="role-meta">
            <time :datetime="role.start">{{ formatPeriod(role.start, role.end) }}</time>
            <span v-if="role.location"> · {{ role.location }}</span>
          </p>
          <p v-for="(paragraph, i) in role.paragraphs" :key="i" class="paragraph">
            {{ paragraph }}
          </p>
          <ul v-if="role.bullets" class="bullets">
            <li v-for="(bullet, i) in role.bullets" :key="i">{{ bullet }}</li>
          </ul>
          <UiTagList v-if="role.stack" :tags="role.stack" class="stack" />
        </article>
      </li>
    </ol>

    <section aria-labelledby="education-heading">
      <UiSectionHeading id="education-heading">Education</UiSectionHeading>
      <ul class="education">
        <li v-for="item in education" :key="item.institution">
          <p class="company">{{ item.institution }}</p>
          <p class="role-title">{{ item.qualification }}</p>
          <p class="role-meta">{{ item.period }}</p>
        </li>
      </ul>
    </section>

    <ContactCta />
  </UiPageContainer>
</template>

<script lang="ts" setup>
import { currentRole, education, formatPeriod, roles } from "#shared/experience";
import { absoluteUrl, site } from "#shared/site";

const title = `Experience · ${site.name}`;
const description = `${currentRole.title} at ${currentRole.company}. Previously Siemens (SAP UI5 to Vue 3 migration, a Vue 3 component library), NOS SGPS, Sinmetro and others.`;

useHead({ link: [{ rel: "canonical", href: absoluteUrl("/experience") }] });
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: absoluteUrl("/experience"),
  ogImage: absoluteUrl("/og.jpg"),
  twitterCard: "summary_large_image",
});
</script>

<style lang="scss" scoped>
.title {
  margin: var(--space-6) 0 var(--space-3);
  font-size: var(--text-4xl);
}

.intro {
  margin: 0 0 var(--space-6);
  color: var(--color-text-muted);
  font-size: var(--text-lg);
}

.timeline {
  display: grid;
  gap: var(--space-5);
  margin: 0;
  padding: 0;
  list-style: none;
}

.role {
  padding-left: var(--space-4);
  border-left: 2px solid var(--color-border);
}

.company {
  margin: 0;
  font-size: var(--text-xl);
  font-weight: 700;
}

.role-title {
  margin: var(--space-1) 0 0;
  font-weight: 500;
}

.role-meta {
  margin: 0 0 var(--space-3);
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

.paragraph {
  margin: 0 0 var(--space-3);
}

.bullets {
  margin: 0;
  padding-left: 1.2rem;

  li {
    margin-bottom: var(--space-2);
  }
}

.stack {
  margin-top: var(--space-3);
}

.education {
  display: grid;
  gap: var(--space-4);
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
