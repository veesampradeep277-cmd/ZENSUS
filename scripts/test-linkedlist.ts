import { judgeService } from '../backend/services/judge.service';

async function testLinkedList() {
  console.log('Testing Problem 206 (Reverse Linked List)...');

  // Python
  const pyCode = `class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = None
        curr = head
        while curr:
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt
        return prev
`;
  const resPy = await judgeService.runProblem('206', 'python', pyCode);
  console.log('Python Result:', resPy.verdict, `passed=${resPy.passedTests}/${resPy.totalTests}`);
  if (resPy.verdict !== 'ACCEPTED') throw new Error(`Python LL failed: ${resPy.verdict}`);

  // JavaScript
  const jsCode = `var reverseList = function(head) {
    let prev = null;
    let curr = head;
    while (curr) {
        let nxt = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nxt;
    }
    return prev;
};`;
  const resJs = await judgeService.runProblem('206', 'javascript', jsCode);
  console.log('JS Result:', resJs.verdict, `passed=${resJs.passedTests}/${resJs.totalTests}`);
  if (resJs.verdict !== 'ACCEPTED') throw new Error(`JS LL failed: ${resJs.verdict}`);

  // Java
  const javaCode = `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nxt = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nxt;
        }
        return prev;
    }
}`;
  const resJava = await judgeService.runProblem('206', 'java', javaCode);
  console.log('Java Result:', resJava.verdict, `passed=${resJava.passedTests}/${resJava.totalTests}`);
  if (resJava.verdict !== 'ACCEPTED') throw new Error(`Java LL failed: ${resJava.verdict}`);

  console.log('✓ Linked List passed across Python, JavaScript, and Java!');
}

testLinkedList().catch(console.error);
