async function verifyAssets() {
  const pages = [
    'http://localhost:3000/dashboard.html',
    'http://localhost:3000/coding-problems/index.html',
    'http://localhost:3000/coding-problems/dsa/index.html',
    'http://localhost:3000/coding-problems/dsa/assets/js/dsa-app.js'
  ];
  for (const url of pages) {
    const res = await fetch(url);
    console.log(url, '-> Status:', res.status, res.statusText);
    if (!res.ok) throw new Error('Failed to fetch ' + url);
  }

  const appJs = await (await fetch('http://localhost:3000/coding-problems/dsa/assets/js/dsa-app.js')).text();
  const checks = [
    { label: 'Language select opening tag (<select id="select-language")', pass: appJs.includes('select id="select-language"') },
    { label: 'Python 3 option (value="python")', pass: appJs.includes('value="python"') },
    { label: 'JavaScript option (value="javascript")', pass: appJs.includes('value="javascript"') },
    { label: 'Java option (value="java")', pass: appJs.includes('value="java"') },
    { label: 'C option (value="c")', pass: appJs.includes('value="c"') },
    { label: 'C++ option (value="cpp")', pass: appJs.includes('value="cpp"') },
    { label: 'RUNNER_UNAVAILABLE banner', pass: appJs.includes('RUNNER UNAVAILABLE') },
    { label: 'Runner health check fetch', pass: appJs.includes('fetchRunnerHealth') }
  ];

  console.log('\n--- Frontend Asset Verifications ---');
  for (const c of checks) {
    console.log(`${c.pass ? '✓' : '✗'} ${c.label}`);
    if (!c.pass) throw new Error('Check failed: ' + c.label);
  }

  console.log('\n✓ All browser assets verified over HTTP from running server!');
}

verifyAssets().catch(console.error);
