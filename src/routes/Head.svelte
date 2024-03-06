<script lang="ts">
    export let title = "Setterboxd";
    export let description = "Compare the movies of any actor, director, or other film contributor.";
    export let image = "/logo.png";
    export let url = "https://setterboxd.vercel.app/";
</script>


<svelte:head>
    <title>{title}</title>

    <meta property="og:title" content={title}>
    <meta property="og:description" content={description}>
    <meta property="og:image" content={image}>
    <meta property="og:url" content={url}>
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Setterboxd">
    <meta property="og:locale" content="English U.S.">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content={title}>
    <meta name="twitter:description" content={description}>
    <meta name="twitter:image" content={image}>
    <meta name="twitter:url" content={url}>
    <!-- <meta name="twitter:site" content="Twitter handle of the website">
    <meta name="twitter:creator" content="Twitter handle of the content creator"> -->
</svelte:head>