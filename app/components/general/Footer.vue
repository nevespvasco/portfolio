<template>
  <footer>
    <span class="footer-copyright">
      &#169; {{ new Date().getFullYear() }} / Vasco Neves
    </span>
    <div class="footer-icons">
      <a href="https://github.com/nevespvasco" aria-label="GitHub">
        <IconsGithub :size="{ width: '1.5em', height: '1.5em' }" />
      </a>
      <a href="https://www.linkedin.com/in/nevespvasco" aria-label="LinkedIn">
        <IconsLinkedin :size="{ width: '1.5em', height: '1.5em' }" />
      </a>
      <a href="mailto:nevespvasco+jobs@gmail.com" aria-label="Email">
        <IconsEmail :size="{ width: '1.5em', height: '1.5em' }" />
      </a>
    </div>
  </footer>
</template>

<style lang="scss">
footer {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 3rem auto 1rem auto;
  font-size: 0.825rem;
  align-items: center;
  gap: 1rem;
}

.footer-copyright {
  color: var(--white);
}

.footer-icons {
  display: flex;
  gap: 1.25rem;
  a {
    color: inherit;
  }
}

@media (min-width: 768px) {
  footer {
    justify-content: space-around;
    flex-direction: row;
    margin: 1rem 0;
    gap: 0;
  }
}
</style>
