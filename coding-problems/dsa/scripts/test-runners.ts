import { executionService } from '../backend/services/execution.service';

async function main() {
  console.log('==============================================');
  console.log('   GENESIS DSA — RUNNER HEALTH VERIFICATION  ');
  console.log('==============================================');

  const health = await executionService.checkRunnersHealth();

  let allOk = true;
  for (const h of health) {
    const statusIcon = h.verified ? '✓ PASSED' : h.available ? '⚠ INSTALLED (Execution check pending)' : '✗ UNAVAILABLE';
    console.log(`[${h.language.toUpperCase()}] ${h.name}`);
    console.log(`   Command:  ${h.command}`);
    console.log(`   Status:   ${statusIcon}`);
    if (h.version) console.log(`   Version:  ${h.version}`);
    if (h.notes) console.log(`   Notes:    ${h.notes}`);
    console.log('----------------------------------------------');
    if (!h.verified) allOk = false;
  }

  if (allOk) {
    console.log('✓ All 4 runners verified successfully with real code execution!');
  } else {
    console.log('Notice: Some runners may require platform containers or compilers.');
  }
}

main().catch(console.error);
