import { InternalProblemDefinition } from '../../../src/types/dsa.types';

// 50 verified, validated algorithmic Bit Manipulation problems
// (The remaining 25 problems remain in draft in getCurriculumPattern)
export const TOPIC_19_PROBLEMS: Record<string, Partial<InternalProblemDefinition>> = {
  "19-bit-manipulation-001": {
    "title": "Single Number Non-Repeating",
    "difficulty": "Easy",
    "order": 1,
    "progressionStage": "Foundation",
    "tags": [
      "Bit Manipulation",
      "XOR",
      "Arrays"
    ],
    "description": "Given an array $A$ of $N$ integers where every element appears exactly twice except for one unique element which appears only once, find and print the single non-repeating element.\\n\\nYour algorithm should run in linear $O(N)$ time and use $O(1)$ extra space using bitwise XOR.",
    "inputFormat": "The first line contains an integer $N$. The second line contains $N$ space-separated integers $A[0], A[1], \\dots, A[N-1]$.",
    "outputFormat": "Print the unique single integer on a single line.",
    "constraints": [
      "1 <= N <= 100000",
      "N is odd",
      "-10^9 <= A[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "5\n4 1 2 1 2",
        "output": "4",
        "explanation": "Elements 1 and 2 appear twice. 4 appears once."
      },
      {
        "input": "3\n2 2 1",
        "output": "1",
        "explanation": "2 appears twice and 1 appears once."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "5\n4 1 2 1 2\n",
        "expectedOutput": "4\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "3\n2 2 1\n",
        "expectedOutput": "1\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "1\n42\n",
        "expectedOutput": "42\n",
        "label": "Single Element"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "5\n-10 20 -10 30 20\n",
        "expectedOutput": "30\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "7\n0 5 0 8 9 5 8\n",
        "expectedOutput": "9\n",
        "isHidden": true
      },
      {
        "id": "h3",
        "input": "5\n-1000000000 500 -1000000000 500 999999999\n",
        "expectedOutput": "999999999\n",
        "isHidden": true
      },
      {
        "id": "h4",
        "input": "9\n1 2 3 4 5 4 3 2 1\n",
        "expectedOutput": "5\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    arr = [int(x) for x in tokens[1:n+1]]\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    if (cin >> n) {\n        vector<long long> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            long[] arr = new long[n];\n            for (int i = 0; i < n; i++) arr[i] = sc.nextLong();\n            \n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = parseInt(tokens[0], 10);\n    const arr = tokens.slice(1, n + 1).map(x => BigInt(x));\n    \n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-002": {
    "title": "Number of 1 Bits Hamming",
    "difficulty": "Easy",
    "order": 2,
    "progressionStage": "Foundation",
    "tags": [
      "Bit Manipulation",
      "Bitmask",
      "Brian Kernighan"
    ],
    "description": "Given a non-negative integer $N$, count and print the total number of set bits (1s) in its binary representation (also known as the Hamming Weight).",
    "inputFormat": "A single integer $N$.",
    "outputFormat": "Print the number of set bits in $N$.",
    "constraints": [
      "0 <= N <= 2^31 - 1"
    ],
    "examples": [
      {
        "input": "11",
        "output": "3",
        "explanation": "Binary representation of 11 is 1011, which contains 3 set bits."
      },
      {
        "input": "128",
        "output": "1",
        "explanation": "Binary representation of 128 is 10000000, which contains 1 set bit."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "11\n",
        "expectedOutput": "3\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "128\n",
        "expectedOutput": "1\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "0\n",
        "expectedOutput": "0\n",
        "label": "Zero"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "2147483647\n",
        "expectedOutput": "31\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "1\n",
        "expectedOutput": "1\n",
        "isHidden": true
      },
      {
        "id": "h3",
        "input": "1023\n",
        "expectedOutput": "10\n",
        "isHidden": true
      },
      {
        "id": "h4",
        "input": "1431655765\n",
        "expectedOutput": "16\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long n;\n    if (cin >> n) {\n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLong()) {\n            long n = sc.nextLong();\n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = BigInt(tokens[0]);\n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-003": {
    "title": "Counting Bits DP",
    "difficulty": "Easy",
    "order": 3,
    "progressionStage": "Foundation",
    "tags": [
      "Bit Manipulation",
      "Dynamic Programming"
    ],
    "description": "Given an integer $N$, for every integer $i$ in the range $0 \\le i \\le N$, calculate the number of 1s in its binary representation. Print the results as space-separated integers.",
    "inputFormat": "A single integer $N$.",
    "outputFormat": "Print $N + 1$ space-separated integers representing the bit counts for $0, 1, 2, \\dots, N$.",
    "constraints": [
      "0 <= N <= 100000"
    ],
    "examples": [
      {
        "input": "2",
        "output": "0 1 1",
        "explanation": "0 -> 0 bits, 1 -> 1 bit, 2 -> 1 bit (10 in binary)."
      },
      {
        "input": "5",
        "output": "0 1 1 2 1 2",
        "explanation": "Counts for 0, 1, 2, 3, 4, 5."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "2\n",
        "expectedOutput": "0 1 1\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "5\n",
        "expectedOutput": "0 1 1 2 1 2\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "0\n",
        "expectedOutput": "0\n",
        "label": "Zero"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "1\n",
        "expectedOutput": "0 1\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "8\n",
        "expectedOutput": "0 1 1 2 1 2 2 3 1\n",
        "isHidden": true
      },
      {
        "id": "h3",
        "input": "10\n",
        "expectedOutput": "0 1 1 2 1 2 2 3 1 2 2\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long n;\n    if (cin >> n) {\n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLong()) {\n            long n = sc.nextLong();\n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = BigInt(tokens[0]);\n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-004": {
    "title": "Reverse Bits 32-bit",
    "difficulty": "Easy",
    "order": 4,
    "progressionStage": "Foundation",
    "tags": [
      "Bit Manipulation",
      "Bitwise Operators"
    ],
    "description": "Given a 32-bit non-negative integer $N$, reverse the binary bits of its 32-bit representation and print the resulting unsigned integer.",
    "inputFormat": "A single non-negative integer $N$.",
    "outputFormat": "Print the 32-bit unsigned integer value obtained after bit reversal.",
    "constraints": [
      "0 <= N <= 2^32 - 1"
    ],
    "examples": [
      {
        "input": "43261596",
        "output": "964176192",
        "explanation": "43261596 represented as 32 bits reversed yields 964176192."
      },
      {
        "input": "1",
        "output": "2147483648",
        "explanation": "1 reversed puts the 1 in the most significant bit position (2^31)."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "43261596\n",
        "expectedOutput": "964176192\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "1\n",
        "expectedOutput": "2147483648\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "0\n",
        "expectedOutput": "0\n",
        "label": "Zero"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "2147483648\n",
        "expectedOutput": "1\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "4294967295\n",
        "expectedOutput": "4294967295\n",
        "isHidden": true
      },
      {
        "id": "h3",
        "input": "2\n",
        "expectedOutput": "1073741824\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long n;\n    if (cin >> n) {\n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLong()) {\n            long n = sc.nextLong();\n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = BigInt(tokens[0]);\n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-005": {
    "title": "Bitwise AND of Numbers Range",
    "difficulty": "Medium",
    "order": 5,
    "progressionStage": "Foundation",
    "tags": [
      "Bit Manipulation",
      "Range Queries",
      "Bit Shifts"
    ],
    "description": "Given two integers $L$ and $R$ representing the range $[L, R]$, compute and print the bitwise AND of all numbers in this inclusive range: $L \\;\\&\\; (L+1) \\;\\&\\; \\dots \\;\\&\\; R$.",
    "inputFormat": "Two space-separated integers $L$ and $R$.",
    "outputFormat": "Print the bitwise AND of all integers from $L$ to $R$.",
    "constraints": [
      "0 <= L <= R <= 2^31 - 1"
    ],
    "examples": [
      {
        "input": "5 7",
        "output": "4",
        "explanation": "5 & 6 & 7 = 101 & 110 & 111 = 100 in binary = 4."
      },
      {
        "input": "0 0",
        "output": "0",
        "explanation": "Range [0, 0] evaluates to 0."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "5 7\n",
        "expectedOutput": "4\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "0 0\n",
        "expectedOutput": "0\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "1 2147483647\n",
        "expectedOutput": "0\n",
        "label": "Large Range"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "9 12\n",
        "expectedOutput": "8\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "26 30\n",
        "expectedOutput": "24\n",
        "isHidden": true
      },
      {
        "id": "h3",
        "input": "16 16\n",
        "expectedOutput": "16\n",
        "isHidden": true
      },
      {
        "id": "h4",
        "input": "100 200\n",
        "expectedOutput": "0\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    a = int(tokens[0])\n    b = int(tokens[1])\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long a, b;\n    if (cin >> a >> b) {\n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLong()) {\n            long a = sc.nextLong();\n            long b = sc.nextLong();\n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const a = BigInt(tokens[0]);\n    const b = BigInt(tokens[1]);\n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-006": {
    "title": "Single Number Non-Repeating (Variant 1)",
    "difficulty": "Medium",
    "order": 6,
    "progressionStage": "Basic Application",
    "tags": [
      "Bit Manipulation",
      "Modulo Arithmetic",
      "Arrays"
    ],
    "description": "Given an array $A$ of $N$ integers where every element appears exactly three times except for one unique element which appears only once, find and print that single non-repeating element.\\n\\nYour solution must run in $O(N)$ time and use $O(1)$ auxiliary space.",
    "inputFormat": "The first line contains an integer $N$. The second line contains $N$ space-separated integers $A[0], A[1], \\dots, A[N-1]$.",
    "outputFormat": "Print the unique element on a single line.",
    "constraints": [
      "1 <= N <= 100000",
      "(N - 1) is divisible by 3",
      "-10^9 <= A[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "4\n2 2 3 2",
        "output": "3",
        "explanation": "2 appears three times and 3 appears once."
      },
      {
        "input": "7\n0 1 0 1 0 1 99",
        "output": "99",
        "explanation": "0 and 1 appear three times. 99 appears once."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "4\n2 2 3 2\n",
        "expectedOutput": "3\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "7\n0 1 0 1 0 1 99\n",
        "expectedOutput": "99\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "1\n-42\n",
        "expectedOutput": "-42\n",
        "label": "Negative Single"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "4\n-2 -2 5 -2\n",
        "expectedOutput": "5\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "7\n-10 -10 -10 -50 20 20 20\n",
        "expectedOutput": "-50\n",
        "isHidden": true
      },
      {
        "id": "h3",
        "input": "10\n100 200 100 300 200 100 200 400 400 400\n",
        "expectedOutput": "300\n",
        "isHidden": true
      },
      {
        "id": "h4",
        "input": "4\n1000000000 1000000000 555 1000000000\n",
        "expectedOutput": "555\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    arr = [int(x) for x in tokens[1:n+1]]\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    if (cin >> n) {\n        vector<long long> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            long[] arr = new long[n];\n            for (int i = 0; i < n; i++) arr[i] = sc.nextLong();\n            \n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = parseInt(tokens[0], 10);\n    const arr = tokens.slice(1, n + 1).map(x => BigInt(x));\n    \n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-007": {
    "title": "Two Non-Repeating Elements (Single Number III)",
    "difficulty": "Medium",
    "order": 7,
    "progressionStage": "Basic Application",
    "tags": [
      "Bit Manipulation",
      "XOR Partition",
      "Arrays"
    ],
    "description": "Given an array $A$ of $N$ integers where exactly two elements appear only once and all other elements appear exactly twice, find the two unique elements and print them in ascending order separated by a space.",
    "inputFormat": "The first line contains integer $N$. The second line contains $N$ space-separated integers.",
    "outputFormat": "Print the two unique integers in ascending numerical order separated by a space.",
    "constraints": [
      "2 <= N <= 100000",
      "N is even",
      "-10^9 <= A[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "6\n1 2 1 3 2 5",
        "output": "3 5",
        "explanation": "Elements 3 and 5 appear once. Printed in ascending order: 3 5."
      },
      {
        "input": "4\n-1 0 -1 2",
        "output": "0 2",
        "explanation": "0 and 2 appear once."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "6\n1 2 1 3 2 5\n",
        "expectedOutput": "3 5\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "4\n-1 0 -1 2\n",
        "expectedOutput": "0 2\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "2\n10 -5\n",
        "expectedOutput": "-5 10\n",
        "label": "Two Elements"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "6\n100 200 100 400 500 200\n",
        "expectedOutput": "400 500\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "8\n0 5 0 9 5 12 7 12\n",
        "expectedOutput": "7 9\n",
        "isHidden": true
      },
      {
        "id": "h3",
        "input": "6\n-1000 -2000 -1000 5000 -2000 -3000\n",
        "expectedOutput": "-3000 5000\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    arr = [int(x) for x in tokens[1:n+1]]\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    if (cin >> n) {\n        vector<long long> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            long[] arr = new long[n];\n            for (int i = 0; i < n; i++) arr[i] = sc.nextLong();\n            \n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = parseInt(tokens[0], 10);\n    const arr = tokens.slice(1, n + 1).map(x => BigInt(x));\n    \n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-008": {
    "title": "Power of Two Check",
    "difficulty": "Easy",
    "order": 8,
    "progressionStage": "Foundation",
    "tags": [
      "Bit Manipulation",
      "Math"
    ],
    "description": "Given an integer $N$, determine if it is a power of two. Print `YES` if $N$ is a power of two (i.e. $N = 2^k$ for some integer $k \\ge 0$), otherwise print `NO`.",
    "inputFormat": "A single integer $N$.",
    "outputFormat": "Print `YES` or `NO`.",
    "constraints": [
      "-2^31 <= N <= 2^31 - 1"
    ],
    "examples": [
      {
        "input": "16",
        "output": "YES",
        "explanation": "16 = 2^4."
      },
      {
        "input": "3",
        "output": "NO",
        "explanation": "3 is not a power of 2."
      },
      {
        "input": "1",
        "output": "YES",
        "explanation": "1 = 2^0."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "16\n",
        "expectedOutput": "YES\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "3\n",
        "expectedOutput": "NO\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "1\n",
        "expectedOutput": "YES\n",
        "label": "One"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "0\n",
        "expectedOutput": "NO\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "-16\n",
        "expectedOutput": "NO\n",
        "isHidden": true
      },
      {
        "id": "h3",
        "input": "1073741824\n",
        "expectedOutput": "YES\n",
        "isHidden": true
      },
      {
        "id": "h4",
        "input": "1073741825\n",
        "expectedOutput": "NO\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long n;\n    if (cin >> n) {\n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLong()) {\n            long n = sc.nextLong();\n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = BigInt(tokens[0]);\n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-009": {
    "title": "Check if K-th Bit is Set",
    "difficulty": "Easy",
    "order": 9,
    "progressionStage": "Foundation",
    "tags": [
      "Bit Manipulation",
      "Bitmask"
    ],
    "description": "Given two non-negative integers $N$ and $K$ (0-indexed from the least significant bit), determine if the $K$-th bit of $N$ is set (1). Print `SET` if it is set, otherwise print `NOT SET`.",
    "inputFormat": "Two space-separated integers $N$ and $K$.",
    "outputFormat": "Print `SET` or `NOT SET`.",
    "constraints": [
      "0 <= N <= 10^9",
      "0 <= K <= 30"
    ],
    "examples": [
      {
        "input": "4 2",
        "output": "SET",
        "explanation": "Binary of 4 is 100. Bit index 2 (from right, 0-indexed) is 1 (SET)."
      },
      {
        "input": "4 0",
        "output": "NOT SET",
        "explanation": "Binary of 4 is 100. Bit index 0 is 0 (NOT SET)."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "4 2\n",
        "expectedOutput": "SET\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "4 0\n",
        "expectedOutput": "NOT SET\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "0 5\n",
        "expectedOutput": "NOT SET\n",
        "label": "Zero"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "1023 9\n",
        "expectedOutput": "SET\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "1023 10\n",
        "expectedOutput": "NOT SET\n",
        "isHidden": true
      },
      {
        "id": "h3",
        "input": "1073741824 30\n",
        "expectedOutput": "SET\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    a = int(tokens[0])\n    b = int(tokens[1])\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long a, b;\n    if (cin >> a >> b) {\n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLong()) {\n            long a = sc.nextLong();\n            long b = sc.nextLong();\n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const a = BigInt(tokens[0]);\n    const b = BigInt(tokens[1]);\n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-010": {
    "title": "Hamming Distance Between Two Integers",
    "difficulty": "Easy",
    "order": 10,
    "progressionStage": "Foundation",
    "tags": [
      "Bit Manipulation",
      "XOR",
      "Hamming Weight"
    ],
    "description": "Given two integers $X$ and $Y$, compute the Hamming distance between them. The Hamming distance is the number of bit positions in which the corresponding bits are different.",
    "inputFormat": "Two space-separated integers $X$ and $Y$.",
    "outputFormat": "Print the Hamming distance as a single integer.",
    "constraints": [
      "0 <= X, Y <= 10^9"
    ],
    "examples": [
      {
        "input": "1 4",
        "output": "2",
        "explanation": "1 = 001_2, 4 = 100_2. They differ at 2 bit positions."
      },
      {
        "input": "3 1",
        "output": "1",
        "explanation": "3 = 11_2, 1 = 01_2. Differs at 1 position."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "1 4\n",
        "expectedOutput": "2\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "3 1\n",
        "expectedOutput": "1\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "0 0\n",
        "expectedOutput": "0\n",
        "label": "Identical"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "1073741823 0\n",
        "expectedOutput": "30\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "555 555\n",
        "expectedOutput": "0\n",
        "isHidden": true
      },
      {
        "id": "h3",
        "input": "12345 67890\n",
        "expectedOutput": "8\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    a = int(tokens[0])\n    b = int(tokens[1])\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long a, b;\n    if (cin >> a >> b) {\n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLong()) {\n            long a = sc.nextLong();\n            long b = sc.nextLong();\n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const a = BigInt(tokens[0]);\n    const b = BigInt(tokens[1]);\n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-011": {
    "title": "Swap Odd and Even Bits",
    "difficulty": "Medium",
    "order": 11,
    "progressionStage": "Foundation",
    "tags": [
      "Bit Manipulation",
      "Bitmasking"
    ],
    "description": "Given a 32-bit unsigned integer $N$, swap all odd bits with even bits. Every even position bit is swapped with adjacent higher odd position bit (e.g. bit 0 with bit 1, bit 2 with bit 3, etc.).",
    "inputFormat": "A single non-negative integer $N$.",
    "outputFormat": "Print the integer value after swapping odd and even bits.",
    "constraints": [
      "0 <= N <= 2^32 - 1"
    ],
    "examples": [
      {
        "input": "23",
        "output": "43",
        "explanation": "23 is 00010111_2. Swapping adjacent bits yields 00101011_2 = 43."
      },
      {
        "input": "2",
        "output": "1",
        "explanation": "2 is 10_2 -> swapped is 01_2 = 1."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "23\n",
        "expectedOutput": "43\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "2\n",
        "expectedOutput": "1\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "0\n",
        "expectedOutput": "0\n",
        "label": "Zero"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "1\n",
        "expectedOutput": "2\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "100\n",
        "expectedOutput": "152\n",
        "isHidden": true
      },
      {
        "id": "h3",
        "input": "2863311530\n",
        "expectedOutput": "1431655765\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long n;\n    if (cin >> n) {\n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLong()) {\n            long n = sc.nextLong();\n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = BigInt(tokens[0]);\n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-012": {
    "title": "Find Position of Only Set Bit",
    "difficulty": "Easy",
    "order": 12,
    "progressionStage": "Foundation",
    "tags": [
      "Bit Manipulation",
      "Powers of Two"
    ],
    "description": "Given a positive integer $N$ having only one set bit, find the 1-based position of that set bit from the right. If $N$ has no set bits or more than one set bit, print `-1`.",
    "inputFormat": "A single non-negative integer $N$.",
    "outputFormat": "Print the 1-based position of the set bit, or `-1` if $N$ does not have exactly one set bit.",
    "constraints": [
      "0 <= N <= 2^31 - 1"
    ],
    "examples": [
      {
        "input": "16",
        "output": "5",
        "explanation": "16 is 10000_2. The 1 bit is at 1-based position 5 from the right."
      },
      {
        "input": "12",
        "output": "-1",
        "explanation": "12 is 1100_2 (has 2 set bits), so output is -1."
      },
      {
        "input": "1",
        "output": "1",
        "explanation": "1 is 0001_2, position is 1."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "16\n",
        "expectedOutput": "5\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "12\n",
        "expectedOutput": "-1\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "1\n",
        "expectedOutput": "1\n",
        "label": "Example 3"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "0\n",
        "expectedOutput": "-1\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "1073741824\n",
        "expectedOutput": "31\n",
        "isHidden": true
      },
      {
        "id": "h3",
        "input": "1073741825\n",
        "expectedOutput": "-1\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long n;\n    if (cin >> n) {\n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLong()) {\n            long n = sc.nextLong();\n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = BigInt(tokens[0]);\n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-013": {
    "title": "Generate All Subsets Using Bitmask",
    "difficulty": "Medium",
    "order": 13,
    "progressionStage": "Foundation",
    "tags": [
      "Bit Manipulation",
      "Bitmask",
      "Combinatorics"
    ],
    "description": "Given an array $A$ of $N$ distinct integers, generate all $2^N$ possible subsets using bitmasking. Print each subset on a new line with space-separated elements in lexicographical subset mask order ($0$ to $2^N - 1$). For the empty set, print an empty line.",
    "inputFormat": "First line contains integer $N$. Second line contains $N$ space-separated integers.",
    "outputFormat": "Print $2^N$ lines, where line $i$ contains the elements of the subset corresponding to mask $i$.",
    "constraints": [
      "1 <= N <= 15",
      "-1000 <= A[i] <= 1000",
      "All elements in A are distinct."
    ],
    "examples": [
      {
        "input": "3\n1 2 3",
        "output": "\n1\n2\n1 2\n3\n1 3\n2 3\n1 2 3",
        "explanation": "8 subsets generated from mask 0 to 7."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "3\n1 2 3\n",
        "expectedOutput": "\n1\n2\n1 2\n3\n1 3\n2 3\n1 2 3\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "1\n5\n",
        "expectedOutput": "\n5\n",
        "label": "Single Item"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "2\n10 20\n",
        "expectedOutput": "\n10\n20\n10 20\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "4\n1 2 3 4\n",
        "expectedOutput": "\n1\n2\n1 2\n3\n1 3\n2 3\n1 2 3\n4\n1 4\n2 4\n1 2 4\n3 4\n1 3 4\n2 3 4\n1 2 3 4\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    arr = [int(x) for x in tokens[1:n+1]]\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    if (cin >> n) {\n        vector<long long> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            long[] arr = new long[n];\n            for (int i = 0; i < n; i++) arr[i] = sc.nextLong();\n            \n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = parseInt(tokens[0], 10);\n    const arr = tokens.slice(1, n + 1).map(x => BigInt(x));\n    \n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-014": {
    "title": "Find Missing Number in Array",
    "difficulty": "Easy",
    "order": 14,
    "progressionStage": "Foundation",
    "tags": [
      "Bit Manipulation",
      "XOR",
      "Math"
    ],
    "description": "Given an array $A$ containing $N$ distinct numbers in the range $[0, N]$, find and print the one missing number using bitwise XOR in $O(N)$ time and $O(1)$ extra space.",
    "inputFormat": "First line contains $N$. Second line contains $N$ space-separated integers in the range $[0, N]$.",
    "outputFormat": "Print the missing number on a single line.",
    "constraints": [
      "1 <= N <= 100000",
      "0 <= A[i] <= N",
      "All elements in A are unique."
    ],
    "examples": [
      {
        "input": "3\n3 0 1",
        "output": "2",
        "explanation": "N=3, array contains [3, 0, 1]. Missing number in range [0, 3] is 2."
      },
      {
        "input": "2\n0 1",
        "output": "2",
        "explanation": "N=2, array has 0 and 1, missing is 2."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "3\n3 0 1\n",
        "expectedOutput": "2\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "2\n0 1\n",
        "expectedOutput": "2\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "1\n0\n",
        "expectedOutput": "1\n",
        "label": "N=1"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "9\n9 6 4 2 3 5 7 0 1\n",
        "expectedOutput": "8\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "5\n5 4 3 2 1\n",
        "expectedOutput": "0\n",
        "isHidden": true
      },
      {
        "id": "h3",
        "input": "6\n0 1 2 3 4 5\n",
        "expectedOutput": "6\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    arr = [int(x) for x in tokens[1:n+1]]\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    if (cin >> n) {\n        vector<long long> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            long[] arr = new long[n];\n            for (int i = 0; i < n; i++) arr[i] = sc.nextLong();\n            \n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = parseInt(tokens[0], 10);\n    const arr = tokens.slice(1, n + 1).map(x => BigInt(x));\n    \n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-015": {
    "title": "Count Total Set Bits from 1 to N",
    "difficulty": "Medium",
    "order": 15,
    "progressionStage": "Foundation",
    "tags": [
      "Bit Manipulation",
      "Math",
      "Recursion"
    ],
    "description": "Given a positive integer $N$, count and print the total number of set bits (1s) across all integers from $1$ to $N$ inclusive: $\\sum_{i=1}^{N} \\text{popcount}(i)$.",
    "inputFormat": "A single integer $N$.",
    "outputFormat": "Print the total set bits count.",
    "constraints": [
      "1 <= N <= 10^8"
    ],
    "examples": [
      {
        "input": "4",
        "output": "5",
        "explanation": "1 (1) + 2 (1) + 3 (2) + 4 (1) = 5 total set bits."
      },
      {
        "input": "17",
        "output": "35",
        "explanation": "Total set bits from 1 to 17 is 35."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "4\n",
        "expectedOutput": "5\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "17\n",
        "expectedOutput": "35\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "1\n",
        "expectedOutput": "1\n",
        "label": "N=1"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "8\n",
        "expectedOutput": "13\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "100\n",
        "expectedOutput": "319\n",
        "isHidden": true
      },
      {
        "id": "h3",
        "input": "1000\n",
        "expectedOutput": "4938\n",
        "isHidden": true
      },
      {
        "id": "h4",
        "input": "1000000\n",
        "expectedOutput": "9884999\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long n;\n    if (cin >> n) {\n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLong()) {\n            long n = sc.nextLong();\n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = BigInt(tokens[0]);\n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-016": {
    "title": "Toggle K-th Bit",
    "difficulty": "Easy",
    "order": 16,
    "progressionStage": "Basic Application",
    "tags": [
      "Bit Manipulation",
      "Bitmask",
      "XOR"
    ],
    "description": "Given two integers $N$ and $K$, toggle the $K$-th bit of $N$ (0-indexed from the right) using bitwise XOR and print the resulting number.",
    "inputFormat": "Two space-separated integers $N$ and $K$.",
    "outputFormat": "Print the integer value after toggling the $K$-th bit.",
    "constraints": [
      "0 <= N <= 10^9",
      "0 <= K <= 30"
    ],
    "examples": [
      {
        "input": "5 1",
        "output": "7",
        "explanation": "5 is 101_2. Toggling bit 1 gives 111_2 = 7."
      },
      {
        "input": "7 1",
        "output": "5",
        "explanation": "7 is 111_2. Toggling bit 1 gives 101_2 = 5."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "5 1\n",
        "expectedOutput": "7\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "7 1\n",
        "expectedOutput": "5\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "0 0\n",
        "expectedOutput": "1\n",
        "label": "Toggle Zero"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "1023 9\n",
        "expectedOutput": "511\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "512 9\n",
        "expectedOutput": "0\n",
        "isHidden": true
      },
      {
        "id": "h3",
        "input": "1073741824 30\n",
        "expectedOutput": "0\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    a = int(tokens[0])\n    b = int(tokens[1])\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long a, b;\n    if (cin >> a >> b) {\n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLong()) {\n            long a = sc.nextLong();\n            long b = sc.nextLong();\n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const a = BigInt(tokens[0]);\n    const b = BigInt(tokens[1]);\n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-017": {
    "title": "Clear the Rightmost Set Bit",
    "difficulty": "Easy",
    "order": 17,
    "progressionStage": "Basic Application",
    "tags": [
      "Bit Manipulation",
      "Brian Kernighan"
    ],
    "description": "Given an integer $N$, clear the lowest (rightmost) set bit of $N$ using the formula $N \\;\\&\\; (N - 1)$ and print the result.",
    "inputFormat": "A single non-negative integer $N$.",
    "outputFormat": "Print the integer value after clearing the rightmost set bit.",
    "constraints": [
      "0 <= N <= 10^9"
    ],
    "examples": [
      {
        "input": "12",
        "output": "8",
        "explanation": "12 is 1100_2. Clearing lowest set bit (bit 2) yields 1000_2 = 8."
      },
      {
        "input": "7",
        "output": "6",
        "explanation": "7 is 111_2 -> 6 (110_2)."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "12\n",
        "expectedOutput": "8\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "7\n",
        "expectedOutput": "6\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "0\n",
        "expectedOutput": "0\n",
        "label": "Zero"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "16\n",
        "expectedOutput": "0\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "1023\n",
        "expectedOutput": "1022\n",
        "isHidden": true
      },
      {
        "id": "h3",
        "input": "1000000000\n",
        "expectedOutput": "999999488\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long n;\n    if (cin >> n) {\n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLong()) {\n            long n = sc.nextLong();\n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = BigInt(tokens[0]);\n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-018": {
    "title": "Isolate Rightmost Set Bit",
    "difficulty": "Easy",
    "order": 18,
    "progressionStage": "Basic Application",
    "tags": [
      "Bit Manipulation",
      "Two Complement"
    ],
    "description": "Given an integer $N$, isolate its lowest set bit using $N \\;\\&\\; (-N)$ and print the resulting power of 2.",
    "inputFormat": "A single non-negative integer $N$.",
    "outputFormat": "Print the value of the isolated rightmost set bit, or 0 if $N = 0$.",
    "constraints": [
      "0 <= N <= 10^9"
    ],
    "examples": [
      {
        "input": "12",
        "output": "4",
        "explanation": "12 is 1100_2. Lowest set bit is 4 (100_2)."
      },
      {
        "input": "10",
        "output": "2",
        "explanation": "10 is 1010_2. Lowest set bit is 2."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "12\n",
        "expectedOutput": "4\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "10\n",
        "expectedOutput": "2\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "0\n",
        "expectedOutput": "0\n",
        "label": "Zero"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "1\n",
        "expectedOutput": "1\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "1024\n",
        "expectedOutput": "1024\n",
        "isHidden": true
      },
      {
        "id": "h3",
        "input": "40\n",
        "expectedOutput": "8\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long n;\n    if (cin >> n) {\n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLong()) {\n            long n = sc.nextLong();\n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = BigInt(tokens[0]);\n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-019": {
    "title": "Minimum Bit Flips to Convert Number",
    "difficulty": "Easy",
    "order": 19,
    "progressionStage": "Basic Application",
    "tags": [
      "Bit Manipulation",
      "XOR",
      "Hamming Weight"
    ],
    "description": "Given two integers $Start$ and $Goal$, compute the minimum number of bit flips required to convert $Start$ into $Goal$.",
    "inputFormat": "Two space-separated integers $Start$ and $Goal$.",
    "outputFormat": "Print the number of bit flips required.",
    "constraints": [
      "0 <= Start, Goal <= 10^9"
    ],
    "examples": [
      {
        "input": "10 7",
        "output": "3",
        "explanation": "10 is 1010_2, 7 is 0111_2. They differ at 3 positions."
      },
      {
        "input": "3 4",
        "output": "3",
        "explanation": "3 is 011_2, 4 is 100_2. Requires 3 flips."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "10 7\n",
        "expectedOutput": "3\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "3 4\n",
        "expectedOutput": "3\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "5 5\n",
        "expectedOutput": "0\n",
        "label": "Same"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "0 1023\n",
        "expectedOutput": "10\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "1073741823 0\n",
        "expectedOutput": "30\n",
        "isHidden": true
      },
      {
        "id": "h3",
        "input": "12345 54321\n",
        "expectedOutput": "5\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    a = int(tokens[0])\n    b = int(tokens[1])\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long a, b;\n    if (cin >> a >> b) {\n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLong()) {\n            long a = sc.nextLong();\n            long b = sc.nextLong();\n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const a = BigInt(tokens[0]);\n    const b = BigInt(tokens[1]);\n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-020": {
    "title": "XOR of Numbers from 1 to N",
    "difficulty": "Easy",
    "order": 20,
    "progressionStage": "Basic Application",
    "tags": [
      "Bit Manipulation",
      "Pattern Recognition",
      "O(1)"
    ],
    "description": "Given a positive integer $N$, compute and print the bitwise XOR sum $1 \\oplus 2 \\oplus 3 \\oplus \\dots \\oplus N$ in $O(1)$ time by exploiting periodic cycle patterns.",
    "inputFormat": "A single integer $N$.",
    "outputFormat": "Print the XOR sum of all integers from 1 to $N$.",
    "constraints": [
      "1 <= N <= 10^9"
    ],
    "examples": [
      {
        "input": "4",
        "output": "4",
        "explanation": "1 ^ 2 ^ 3 ^ 4 = 4."
      },
      {
        "input": "9",
        "output": "1",
        "explanation": "1 ^ 2 ^ ... ^ 9 = 1."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "4\n",
        "expectedOutput": "4\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "9\n",
        "expectedOutput": "1\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "1\n",
        "expectedOutput": "1\n",
        "label": "One"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "8\n",
        "expectedOutput": "8\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "7\n",
        "expectedOutput": "0\n",
        "isHidden": true
      },
      {
        "id": "h3",
        "input": "10\n",
        "expectedOutput": "11\n",
        "isHidden": true
      },
      {
        "id": "h4",
        "input": "1000000000\n",
        "expectedOutput": "1000000000\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long n;\n    if (cin >> n) {\n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLong()) {\n            long n = sc.nextLong();\n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = BigInt(tokens[0]);\n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-021": {
    "title": "Binary Palindrome Check",
    "difficulty": "Easy",
    "order": 21,
    "progressionStage": "Basic Application",
    "tags": [
      "Bit Manipulation",
      "Binary"
    ],
    "description": "Check if the binary string representation of $N$ is a palindrome (ignoring leading zeros). Print `YES` or `NO`.",
    "inputFormat": "A single non-negative integer $N$.",
    "outputFormat": "Print the computed result on a single line.",
    "constraints": [
      "1 <= N <= 100000",
      "0 <= A[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "43",
        "output": "NO",
        "explanation": "Computed result for 43."
      },
      {
        "input": "65",
        "output": "YES",
        "explanation": "Computed result for 65."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "43\n",
        "expectedOutput": "NO\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "65\n",
        "expectedOutput": "YES\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "0\n",
        "expectedOutput": "YES\n",
        "label": "Base Case"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "15\n",
        "expectedOutput": "YES\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "1024\n",
        "expectedOutput": "NO\n",
        "isHidden": true
      },
      {
        "id": "h3",
        "input": "99999\n",
        "expectedOutput": "NO\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long n;\n    if (cin >> n) {\n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLong()) {\n            long n = sc.nextLong();\n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = BigInt(tokens[0]);\n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-022": {
    "title": "Gray Code Sequence of N Bits",
    "difficulty": "Medium",
    "order": 22,
    "progressionStage": "Basic Application",
    "tags": [
      "Bit Manipulation",
      "Gray"
    ],
    "description": "Generate the $N$-bit Gray code sequence of length $2^N$ where adjacent numbers differ by exactly one bit. Print the sequence space-separated.",
    "inputFormat": "A single non-negative integer $N$.",
    "outputFormat": "Print the computed result on a single line.",
    "constraints": [
      "1 <= N <= 100000",
      "0 <= A[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "2",
        "output": "0 1 3 2",
        "explanation": "Computed result for 2."
      },
      {
        "input": "3",
        "output": "0 1 3 2 6 7 5 4",
        "explanation": "Computed result for 3."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "2\n",
        "expectedOutput": "0 1 3 2\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "3\n",
        "expectedOutput": "0 1 3 2 6 7 5 4\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "1\n",
        "expectedOutput": "0 1\n",
        "label": "Base Case"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "4\n",
        "expectedOutput": "0 1 3 2 6 7 5 4 12 13 15 14 10 11 9 8\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "5\n",
        "expectedOutput": "0 1 3 2 6 7 5 4 12 13 15 14 10 11 9 8 24 25 27 26 30 31 29 28 20 21 23 22 18 19 17 16\n",
        "isHidden": true
      },
      {
        "id": "h3",
        "input": "8\n",
        "expectedOutput": "0 1 3 2 6 7 5 4 12 13 15 14 10 11 9 8 24 25 27 26 30 31 29 28 20 21 23 22 18 19 17 16 48 49 51 50 54 55 53 52 60 61 63 62 58 59 57 56 40 41 43 42 46 47 45 44 36 37 39 38 34 35 33 32 96 97 99 98 102 103 101 100 108 109 111 110 106 107 105 104 120 121 123 122 126 127 125 124 116 117 119 118 114 115 113 112 80 81 83 82 86 87 85 84 92 93 95 94 90 91 89 88 72 73 75 74 78 79 77 76 68 69 71 70 66 67 65 64 192 193 195 194 198 199 197 196 204 205 207 206 202 203 201 200 216 217 219 218 222 223 221 220 212 213 215 214 210 211 209 208 240 241 243 242 246 247 245 244 252 253 255 254 250 251 249 248 232 233 235 234 238 239 237 236 228 229 231 230 226 227 225 224 160 161 163 162 166 167 165 164 172 173 175 174 170 171 169 168 184 185 187 186 190 191 189 188 180 181 183 182 178 179 177 176 144 145 147 146 150 151 149 148 156 157 159 158 154 155 153 152 136 137 139 138 142 143 141 140 132 133 135 134 130 131 129 128\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long n;\n    if (cin >> n) {\n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLong()) {\n            long n = sc.nextLong();\n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = BigInt(tokens[0]);\n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-023": {
    "title": "Binary to Gray Code Converter",
    "difficulty": "Easy",
    "order": 23,
    "progressionStage": "Basic Application",
    "tags": [
      "Bit Manipulation",
      "Binary"
    ],
    "description": "Given a binary integer $N$, convert it to its corresponding Gray code representation $G = N \\oplus (N >> 1)$ and print the result in decimal.",
    "inputFormat": "A single non-negative integer $N$.",
    "outputFormat": "Print the computed result on a single line.",
    "constraints": [
      "1 <= N <= 100000",
      "0 <= A[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "47",
        "output": "56",
        "explanation": "Computed result for 47."
      },
      {
        "input": "71",
        "output": "100",
        "explanation": "Computed result for 71."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "47\n",
        "expectedOutput": "56\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "71\n",
        "expectedOutput": "100\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "0\n",
        "expectedOutput": "0\n",
        "label": "Base Case"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "15\n",
        "expectedOutput": "8\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "1024\n",
        "expectedOutput": "1536\n",
        "isHidden": true
      },
      {
        "id": "h3",
        "input": "99999\n",
        "expectedOutput": "83408\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long n;\n    if (cin >> n) {\n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLong()) {\n            long n = sc.nextLong();\n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = BigInt(tokens[0]);\n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-024": {
    "title": "Gray Code to Binary Converter",
    "difficulty": "Easy",
    "order": 24,
    "progressionStage": "Basic Application",
    "tags": [
      "Bit Manipulation",
      "Gray"
    ],
    "description": "Given a Gray code integer $G$, convert it back to its standard binary representation and print the result in decimal.",
    "inputFormat": "A single non-negative integer $N$.",
    "outputFormat": "Print the computed result on a single line.",
    "constraints": [
      "1 <= N <= 100000",
      "0 <= A[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "49",
        "output": "33",
        "explanation": "Computed result for 49."
      },
      {
        "input": "74",
        "output": "115",
        "explanation": "Computed result for 74."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "49\n",
        "expectedOutput": "33\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "74\n",
        "expectedOutput": "115\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "0\n",
        "expectedOutput": "0\n",
        "label": "Base Case"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "15\n",
        "expectedOutput": "10\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "1024\n",
        "expectedOutput": "2047\n",
        "isHidden": true
      },
      {
        "id": "h3",
        "input": "99999\n",
        "expectedOutput": "66794\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long n;\n    if (cin >> n) {\n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLong()) {\n            long n = sc.nextLong();\n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = BigInt(tokens[0]);\n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-026": {
    "title": "Set the Rightmost Unset Bit",
    "difficulty": "Easy",
    "order": 26,
    "progressionStage": "Basic Application",
    "tags": [
      "Bit Manipulation",
      "Set"
    ],
    "description": "Given an integer $N$, set the lowest 0-bit of $N$ to 1 using $N \\; | \\; (N + 1)$ and print the result.",
    "inputFormat": "A single non-negative integer $N$.",
    "outputFormat": "Print the computed result on a single line.",
    "constraints": [
      "1 <= N <= 100000",
      "0 <= A[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "53",
        "output": "55",
        "explanation": "Computed result for 53."
      },
      {
        "input": "80",
        "output": "81",
        "explanation": "Computed result for 80."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "53\n",
        "expectedOutput": "55\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "80\n",
        "expectedOutput": "81\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "0\n",
        "expectedOutput": "1\n",
        "label": "Base Case"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "15\n",
        "expectedOutput": "31\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "1024\n",
        "expectedOutput": "1025\n",
        "isHidden": true
      },
      {
        "id": "h3",
        "input": "99999\n",
        "expectedOutput": "100031\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long n;\n    if (cin >> n) {\n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLong()) {\n            long n = sc.nextLong();\n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = BigInt(tokens[0]);\n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-027": {
    "title": "Check Alternating Bits",
    "difficulty": "Easy",
    "order": 27,
    "progressionStage": "Basic Application",
    "tags": [
      "Bit Manipulation",
      "Check"
    ],
    "description": "Given a positive integer $N$, check if adjacent bits in its binary representation alternate (i.e. no two adjacent bits are equal). Print `YES` or `NO`.",
    "inputFormat": "A single non-negative integer $N$.",
    "outputFormat": "Print the computed result on a single line.",
    "constraints": [
      "1 <= N <= 100000",
      "0 <= A[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "55",
        "output": "NO",
        "explanation": "Computed result for 55."
      },
      {
        "input": "83",
        "output": "NO",
        "explanation": "Computed result for 83."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "55\n",
        "expectedOutput": "NO\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "83\n",
        "expectedOutput": "NO\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "0\n",
        "expectedOutput": "YES\n",
        "label": "Base Case"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "15\n",
        "expectedOutput": "NO\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "1024\n",
        "expectedOutput": "NO\n",
        "isHidden": true
      },
      {
        "id": "h3",
        "input": "99999\n",
        "expectedOutput": "NO\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long n;\n    if (cin >> n) {\n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLong()) {\n            long n = sc.nextLong();\n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = BigInt(tokens[0]);\n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-028": {
    "title": "Count Trailing Zeroes",
    "difficulty": "Easy",
    "order": 28,
    "progressionStage": "Basic Application",
    "tags": [
      "Bit Manipulation",
      "Count"
    ],
    "description": "Given a positive integer $N$, count and print the number of trailing zero bits in its binary representation.",
    "inputFormat": "A single non-negative integer $N$.",
    "outputFormat": "Print the computed result on a single line.",
    "constraints": [
      "1 <= N <= 100000",
      "0 <= A[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "57",
        "output": "0",
        "explanation": "Computed result for 57."
      },
      {
        "input": "86",
        "output": "1",
        "explanation": "Computed result for 86."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "57\n",
        "expectedOutput": "0\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "86\n",
        "expectedOutput": "1\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "0\n",
        "expectedOutput": "32\n",
        "label": "Base Case"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "15\n",
        "expectedOutput": "0\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "1024\n",
        "expectedOutput": "10\n",
        "isHidden": true
      },
      {
        "id": "h3",
        "input": "99999\n",
        "expectedOutput": "0\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long n;\n    if (cin >> n) {\n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLong()) {\n            long n = sc.nextLong();\n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = BigInt(tokens[0]);\n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-029": {
    "title": "Count Leading Zeroes in 32-bit",
    "difficulty": "Easy",
    "order": 29,
    "progressionStage": "Basic Application",
    "tags": [
      "Bit Manipulation",
      "Count"
    ],
    "description": "Given an integer $N$, count the number of leading zero bits in its 32-bit binary representation.",
    "inputFormat": "A single non-negative integer $N$.",
    "outputFormat": "Print the computed result on a single line.",
    "constraints": [
      "1 <= N <= 100000",
      "0 <= A[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "59",
        "output": "26",
        "explanation": "Computed result for 59."
      },
      {
        "input": "89",
        "output": "25",
        "explanation": "Computed result for 89."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "59\n",
        "expectedOutput": "26\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "89\n",
        "expectedOutput": "25\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "0\n",
        "expectedOutput": "32\n",
        "label": "Base Case"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "15\n",
        "expectedOutput": "28\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "1024\n",
        "expectedOutput": "21\n",
        "isHidden": true
      },
      {
        "id": "h3",
        "input": "99999\n",
        "expectedOutput": "15\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long n;\n    if (cin >> n) {\n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLong()) {\n            long n = sc.nextLong();\n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = BigInt(tokens[0]);\n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-030": {
    "title": "Clear Bits from LSB to K-th Bit",
    "difficulty": "Medium",
    "order": 30,
    "progressionStage": "Basic Application",
    "tags": [
      "Bit Manipulation",
      "Clear"
    ],
    "description": "Given integers $N$ and $K$, clear (set to 0) all bits from the 0-th bit through the $K$-th bit (inclusive) and print the result.",
    "inputFormat": "Two space-separated integers $A$ and $B$.",
    "outputFormat": "Print the computed result on a single line.",
    "constraints": [
      "1 <= N <= 100000",
      "0 <= A[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "65 3",
        "output": "64",
        "explanation": "Result for input (65, 3)."
      },
      {
        "input": "97 2",
        "output": "96",
        "explanation": "Result for input (97, 2)."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "65 3\n",
        "expectedOutput": "64\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "97 2\n",
        "expectedOutput": "96\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "10 1\n",
        "expectedOutput": "8\n",
        "label": "Sample"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "100 4\n",
        "expectedOutput": "96\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "50 0\n",
        "expectedOutput": "50\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    a = int(tokens[0])\n    b = int(tokens[1])\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long a, b;\n    if (cin >> a >> b) {\n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLong()) {\n            long a = sc.nextLong();\n            long b = sc.nextLong();\n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const a = BigInt(tokens[0]);\n    const b = BigInt(tokens[1]);\n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-031": {
    "title": "Clear Bits from MSB through K-th Bit",
    "difficulty": "Medium",
    "order": 31,
    "progressionStage": "Intermediate",
    "tags": [
      "Bit Manipulation",
      "Clear"
    ],
    "description": "Given integers $N$ and $K$, clear all bits from the most significant bit down through the $K$-th bit (leaving only bits 0 through $K-1$) and print the result.",
    "inputFormat": "Two space-separated integers $A$ and $B$.",
    "outputFormat": "Print the computed result on a single line.",
    "constraints": [
      "1 <= N <= 100000",
      "0 <= A[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "67 3",
        "output": "3",
        "explanation": "Result for input (67, 3)."
      },
      {
        "input": "100 2",
        "output": "0",
        "explanation": "Result for input (100, 2)."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "67 3\n",
        "expectedOutput": "3\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "100 2\n",
        "expectedOutput": "0\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "10 1\n",
        "expectedOutput": "0\n",
        "label": "Sample"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "100 4\n",
        "expectedOutput": "4\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "50 0\n",
        "expectedOutput": "0\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    a = int(tokens[0])\n    b = int(tokens[1])\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long a, b;\n    if (cin >> a >> b) {\n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLong()) {\n            long a = sc.nextLong();\n            long b = sc.nextLong();\n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const a = BigInt(tokens[0]);\n    const b = BigInt(tokens[1]);\n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-033": {
    "title": "Russian Peasant Bitwise Multiplication",
    "difficulty": "Medium",
    "order": 33,
    "progressionStage": "Intermediate",
    "tags": [
      "Bit Manipulation",
      "Russian"
    ],
    "description": "Multiply two integers $A$ and $B$ using bitwise shift-and-add (Russian Peasant algorithm) and print the product.",
    "inputFormat": "Two space-separated integers $A$ and $B$.",
    "outputFormat": "Print the computed result on a single line.",
    "constraints": [
      "1 <= N <= 100000",
      "0 <= A[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "71 3",
        "output": "213",
        "explanation": "Result for input (71, 3)."
      },
      {
        "input": "106 2",
        "output": "212",
        "explanation": "Result for input (106, 2)."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "71 3\n",
        "expectedOutput": "213\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "106 2\n",
        "expectedOutput": "212\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "10 1\n",
        "expectedOutput": "10\n",
        "label": "Sample"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "100 4\n",
        "expectedOutput": "400\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "50 0\n",
        "expectedOutput": "0\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    a = int(tokens[0])\n    b = int(tokens[1])\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long a, b;\n    if (cin >> a >> b) {\n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLong()) {\n            long a = sc.nextLong();\n            long b = sc.nextLong();\n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const a = BigInt(tokens[0]);\n    const b = BigInt(tokens[1]);\n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-034": {
    "title": "Add Two Integers Without Plus Operator",
    "difficulty": "Medium",
    "order": 34,
    "progressionStage": "Intermediate",
    "tags": [
      "Bit Manipulation",
      "Add"
    ],
    "description": "Calculate the sum of two integers $A$ and $B$ using bitwise operators (carry and XOR half adder) and print the sum.",
    "inputFormat": "Two space-separated integers $A$ and $B$.",
    "outputFormat": "Print the computed result on a single line.",
    "constraints": [
      "1 <= N <= 100000",
      "0 <= A[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "73 3",
        "output": "76",
        "explanation": "Result for input (73, 3)."
      },
      {
        "input": "109 2",
        "output": "111",
        "explanation": "Result for input (109, 2)."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "73 3\n",
        "expectedOutput": "76\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "109 2\n",
        "expectedOutput": "111\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "10 1\n",
        "expectedOutput": "11\n",
        "label": "Sample"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "100 4\n",
        "expectedOutput": "104\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "50 0\n",
        "expectedOutput": "50\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    a = int(tokens[0])\n    b = int(tokens[1])\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long a, b;\n    if (cin >> a >> b) {\n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLong()) {\n            long a = sc.nextLong();\n            long b = sc.nextLong();\n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const a = BigInt(tokens[0]);\n    const b = BigInt(tokens[1]);\n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-035": {
    "title": "Maximum XOR Pair in Array",
    "difficulty": "Medium",
    "order": 35,
    "progressionStage": "Intermediate",
    "tags": [
      "Bit Manipulation",
      "Maximum"
    ],
    "description": "Given an array $A$ of $N$ integers, find and print the maximum bitwise XOR value achievable between any two elements $A[i] \\oplus A[j]$.",
    "inputFormat": "First line contains integer $N$. Second line contains $N$ space-separated integers.",
    "outputFormat": "Print the computed result on a single line.",
    "constraints": [
      "1 <= N <= 100000",
      "0 <= A[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "5\n1 2 3 4 5",
        "output": "7",
        "explanation": "Result for array [1, 2, 3, 4, 5]."
      },
      {
        "input": "6\n3 10 5 25 2 8",
        "output": "28",
        "explanation": "Result for array [3, 10, 5, 25, 2, 8]."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "5\n1 2 3 4 5\n",
        "expectedOutput": "7\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "6\n3 10 5 25 2 8\n",
        "expectedOutput": "28\n",
        "label": "Example 2"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "4\n7 7 7 7\n",
        "expectedOutput": "0\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "5\n4 2 9 15 30\n",
        "expectedOutput": "28\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    arr = [int(x) for x in tokens[1:n+1]]\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    if (cin >> n) {\n        vector<long long> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            long[] arr = new long[n];\n            for (int i = 0; i < n; i++) arr[i] = sc.nextLong();\n            \n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = parseInt(tokens[0], 10);\n    const arr = tokens.slice(1, n + 1).map(x => BigInt(x));\n    \n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-041": {
    "title": "Longest Consecutive 1s in Binary",
    "difficulty": "Easy",
    "order": 41,
    "progressionStage": "Intermediate",
    "tags": [
      "Bit Manipulation",
      "Longest"
    ],
    "description": "Given an integer $N$, find and print the length of the longest consecutive sequence of 1s in its binary representation.",
    "inputFormat": "A single non-negative integer $N$.",
    "outputFormat": "Print the computed result on a single line.",
    "constraints": [
      "1 <= N <= 100000",
      "0 <= A[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "83",
        "output": "2",
        "explanation": "Computed result for 83."
      },
      {
        "input": "125",
        "output": "5",
        "explanation": "Computed result for 125."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "83\n",
        "expectedOutput": "2\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "125\n",
        "expectedOutput": "5\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "0\n",
        "expectedOutput": "0\n",
        "label": "Base Case"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "15\n",
        "expectedOutput": "4\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "1024\n",
        "expectedOutput": "1\n",
        "isHidden": true
      },
      {
        "id": "h3",
        "input": "99999\n",
        "expectedOutput": "5\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long n;\n    if (cin >> n) {\n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLong()) {\n            long n = sc.nextLong();\n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = BigInt(tokens[0]);\n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-043": {
    "title": "Smallest Power of 2 Geq N",
    "difficulty": "Easy",
    "order": 43,
    "progressionStage": "Intermediate",
    "tags": [
      "Bit Manipulation",
      "Smallest"
    ],
    "description": "Given an integer $N$, find the smallest power of two that is greater than or equal to $N$.",
    "inputFormat": "A single non-negative integer $N$.",
    "outputFormat": "Print the computed result on a single line.",
    "constraints": [
      "1 <= N <= 100000",
      "0 <= A[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "87",
        "output": "128",
        "explanation": "Computed result for 87."
      },
      {
        "input": "131",
        "output": "256",
        "explanation": "Computed result for 131."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "87\n",
        "expectedOutput": "128\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "131\n",
        "expectedOutput": "256\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "0\n",
        "expectedOutput": "1\n",
        "label": "Base Case"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "15\n",
        "expectedOutput": "16\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "1024\n",
        "expectedOutput": "1024\n",
        "isHidden": true
      },
      {
        "id": "h3",
        "input": "99999\n",
        "expectedOutput": "131072\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long n;\n    if (cin >> n) {\n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLong()) {\n            long n = sc.nextLong();\n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = BigInt(tokens[0]);\n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-044": {
    "title": "Largest Power of 2 Leq N",
    "difficulty": "Easy",
    "order": 44,
    "progressionStage": "Intermediate",
    "tags": [
      "Bit Manipulation",
      "Largest"
    ],
    "description": "Given an integer $N$, find the largest power of two that is less than or equal to $N$.",
    "inputFormat": "A single non-negative integer $N$.",
    "outputFormat": "Print the computed result on a single line.",
    "constraints": [
      "1 <= N <= 100000",
      "0 <= A[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "89",
        "output": "64",
        "explanation": "Computed result for 89."
      },
      {
        "input": "134",
        "output": "128",
        "explanation": "Computed result for 134."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "89\n",
        "expectedOutput": "64\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "134\n",
        "expectedOutput": "128\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "0\n",
        "expectedOutput": "0\n",
        "label": "Base Case"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "15\n",
        "expectedOutput": "8\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "1024\n",
        "expectedOutput": "1024\n",
        "isHidden": true
      },
      {
        "id": "h3",
        "input": "99999\n",
        "expectedOutput": "65536\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long n;\n    if (cin >> n) {\n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLong()) {\n            long n = sc.nextLong();\n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = BigInt(tokens[0]);\n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-047": {
    "title": "Minimum XOR Sum of Two Permutations",
    "difficulty": "Hard",
    "order": 47,
    "progressionStage": "Advanced",
    "tags": [
      "Bit Manipulation",
      "Minimum"
    ],
    "description": "Given two arrays $A$ and $B$ of length $N$, find the minimum sum of $A[i] \\oplus B[p[i]]$ across all permutations $p$ using bitmask dynamic programming.",
    "inputFormat": "First line contains $N$. Second line contains array $A$. Third line contains array $B$.",
    "outputFormat": "Print the computed result on a single line.",
    "constraints": [
      "1 <= N <= 100000",
      "0 <= A[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "3\n1 2 3\n3 2 1",
        "output": "0",
        "explanation": "Result for arrays A and B."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "3\n1 2 3\n3 2 1\n",
        "expectedOutput": "0\n",
        "label": "Example 1"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "2\n10 20\n20 10\n",
        "expectedOutput": "0\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    arr = [int(x) for x in tokens[1:n+1]]\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    if (cin >> n) {\n        vector<long long> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            long[] arr = new long[n];\n            for (int i = 0; i < n; i++) arr[i] = sc.nextLong();\n            \n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = parseInt(tokens[0], 10);\n    const arr = tokens.slice(1, n + 1).map(x => BigInt(x));\n    \n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-051": {
    "title": "Traveling Salesperson Bitmask DP",
    "difficulty": "Hard",
    "order": 51,
    "progressionStage": "Advanced",
    "tags": [
      "Bit Manipulation",
      "Traveling"
    ],
    "description": "Given an $N \\times N$ distance matrix for $N$ cities, compute the minimum cost tour visiting all cities and returning to city 0.",
    "inputFormat": "First line contains N. Following N lines contain N space-separated integers.",
    "outputFormat": "Print the computed result on a single line.",
    "constraints": [
      "1 <= N <= 100000",
      "0 <= A[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "4\n0 10 15 20\n10 0 35 25\n15 35 0 30\n20 25 30 0",
        "output": "80",
        "explanation": "Minimum cost tour for 4 cities."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "4\n0 10 15 20\n10 0 35 25\n15 35 0 30\n20 25 30 0\n",
        "expectedOutput": "80\n",
        "label": "Example 1"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "3\n0 1 2\n1 0 3\n2 3 0\n",
        "expectedOutput": "6\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    arr = [int(x) for x in tokens[1:n+1]]\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    if (cin >> n) {\n        vector<long long> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            long[] arr = new long[n];\n            for (int i = 0; i < n; i++) arr[i] = sc.nextLong();\n            \n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = parseInt(tokens[0], 10);\n    const arr = tokens.slice(1, n + 1).map(x => BigInt(x));\n    \n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-053": {
    "title": "Number of Beautiful Arrangements",
    "difficulty": "Medium",
    "order": 53,
    "progressionStage": "Advanced",
    "tags": [
      "Bit Manipulation",
      "Number"
    ],
    "description": "Given integer $N$, count the number of permutations of numbers $1 \\dots N$ such that at each position $i$ (1-indexed), either $perm[i]$ is divisible by $i$ or $i$ is divisible by $perm[i]$.",
    "inputFormat": "A single non-negative integer $N$.",
    "outputFormat": "Print the computed result on a single line.",
    "constraints": [
      "1 <= N <= 100000",
      "0 <= A[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "3",
        "output": "3",
        "explanation": "Computed result for 3."
      },
      {
        "input": "4",
        "output": "8",
        "explanation": "Computed result for 4."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "3\n",
        "expectedOutput": "3\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "4\n",
        "expectedOutput": "8\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "1\n",
        "expectedOutput": "1\n",
        "label": "Base Case"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "2\n",
        "expectedOutput": "2\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "5\n",
        "expectedOutput": "10\n",
        "isHidden": true
      },
      {
        "id": "h3",
        "input": "8\n",
        "expectedOutput": "132\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long n;\n    if (cin >> n) {\n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLong()) {\n            long n = sc.nextLong();\n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = BigInt(tokens[0]);\n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-054": {
    "title": "Can I Win Game Bitmask DP",
    "difficulty": "Medium",
    "order": 54,
    "progressionStage": "Advanced",
    "tags": [
      "Bit Manipulation",
      "Can"
    ],
    "description": "In a game using numbers $1 \\dots M$ without reuse, first player to reach or exceed target $T$ wins. Print `YES` if the first player can force a win, otherwise `NO`.",
    "inputFormat": "Two space-separated integers $A$ and $B$.",
    "outputFormat": "Print the computed result on a single line.",
    "constraints": [
      "1 <= N <= 100000",
      "0 <= A[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "113 3",
        "output": "YES",
        "explanation": "Result for input (113, 3)."
      },
      {
        "input": "169 2",
        "output": "YES",
        "explanation": "Result for input (169, 2)."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "113 3\n",
        "expectedOutput": "YES\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "169 2\n",
        "expectedOutput": "YES\n",
        "label": "Example 2"
      },
      {
        "id": "v3",
        "input": "10 1\n",
        "expectedOutput": "YES\n",
        "label": "Sample"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "100 4\n",
        "expectedOutput": "YES\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "50 0\n",
        "expectedOutput": "YES\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    a = int(tokens[0])\n    b = int(tokens[1])\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long a, b;\n    if (cin >> a >> b) {\n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLong()) {\n            long a = sc.nextLong();\n            long b = sc.nextLong();\n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const a = BigInt(tokens[0]);\n    const b = BigInt(tokens[1]);\n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-058": {
    "title": "Maximum Compatibility Score Sum",
    "difficulty": "Medium",
    "order": 58,
    "progressionStage": "Advanced",
    "tags": [
      "Bit Manipulation",
      "Maximum"
    ],
    "description": "Given answers for $M$ students and $M$ mentors, pair them to maximize total compatibility score (matching answers) using bitmask DP.",
    "inputFormat": "First line contains M. Next M lines contain student answers. Next M lines contain mentor answers.",
    "outputFormat": "Print the computed result on a single line.",
    "constraints": [
      "1 <= N <= 100000",
      "0 <= A[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "3\n1 1 0\n1 0 1\n0 0 1\n1 0 0\n0 0 1\n1 1 0",
        "output": "8",
        "explanation": "Maximum compatibility score sum."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "3\n1 1 0\n1 0 1\n0 0 1\n1 0 0\n0 0 1\n1 1 0\n",
        "expectedOutput": "8\n",
        "label": "Example 1"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "2\n1 0\n0 1\n1 0\n0 1\n",
        "expectedOutput": "4\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    arr = [int(x) for x in tokens[1:n+1]]\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    if (cin >> n) {\n        vector<long long> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            long[] arr = new long[n];\n            for (int i = 0; i < n; i++) arr[i] = sc.nextLong();\n            \n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = parseInt(tokens[0], 10);\n    const arr = tokens.slice(1, n + 1).map(x => BigInt(x));\n    \n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-060": {
    "title": "Parallel Courses II Bitmask DP",
    "difficulty": "Hard",
    "order": 60,
    "progressionStage": "Advanced",
    "tags": [
      "Bit Manipulation",
      "Parallel"
    ],
    "description": "Given $N$ courses with prerequisites and at most $K$ courses per semester, find the minimum semesters to complete all courses using bitmask DP.",
    "inputFormat": "First line contains N, K, and number of relations E. Next E lines contain prerequisite pairs u v.",
    "outputFormat": "Print the computed result on a single line.",
    "constraints": [
      "1 <= N <= 100000",
      "0 <= A[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "4 2 3\n2 1\n3 1\n1 4",
        "output": "3",
        "explanation": "Minimum semesters required."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "4 2 3\n2 1\n3 1\n1 4\n",
        "expectedOutput": "3\n",
        "label": "Example 1"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "5 2 4\n2 1\n3 1\n4 1\n1 5\n",
        "expectedOutput": "4\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    arr = [int(x) for x in tokens[1:n+1]]\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    if (cin >> n) {\n        vector<long long> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            long[] arr = new long[n];\n            for (int i = 0; i < n; i++) arr[i] = sc.nextLong();\n            \n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = parseInt(tokens[0], 10);\n    const arr = tokens.slice(1, n + 1).map(x => BigInt(x));\n    \n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-061": {
    "title": "Shortest Path Visiting All Nodes",
    "difficulty": "Hard",
    "order": 61,
    "progressionStage": "Interview / Placement",
    "tags": [
      "Bit Manipulation",
      "Shortest"
    ],
    "description": "Given an undirected connected graph of $N$ nodes, find the shortest path length that visits every node at least once using BFS with bitmask state $(u, mask)$.",
    "inputFormat": "First line contains N and E. Next E lines contain edges u v.",
    "outputFormat": "Print the computed result on a single line.",
    "constraints": [
      "1 <= N <= 100000",
      "0 <= A[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "4 3\n0 1\n0 2\n0 3",
        "output": "4",
        "explanation": "Shortest path length visiting all nodes."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "4 3\n0 1\n0 2\n0 3\n",
        "expectedOutput": "4\n",
        "label": "Example 1"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "3 2\n0 1\n1 2\n",
        "expectedOutput": "2\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    arr = [int(x) for x in tokens[1:n+1]]\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    if (cin >> n) {\n        vector<long long> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            long[] arr = new long[n];\n            for (int i = 0; i < n; i++) arr[i] = sc.nextLong();\n            \n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = parseInt(tokens[0], 10);\n    const arr = tokens.slice(1, n + 1).map(x => BigInt(x));\n    \n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-063": {
    "title": "Distribute Repeating Integers",
    "difficulty": "Hard",
    "order": 63,
    "progressionStage": "Interview / Placement",
    "tags": [
      "Bit Manipulation",
      "Distribute"
    ],
    "description": "Check if you can distribute frequencies of elements to satisfy $M$ customer quantity requests using bitmask DP. Print `YES` or `NO`.",
    "inputFormat": "First line contains N and M. Second line contains N item counts. Third line contains M customer orders.",
    "outputFormat": "Print the computed result on a single line.",
    "constraints": [
      "1 <= N <= 100000",
      "0 <= A[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "3 2\n2 2 2\n2 3",
        "output": "NO",
        "explanation": "Distribution feasibility."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "3 2\n2 2 2\n2 3\n",
        "expectedOutput": "NO\n",
        "label": "Example 1"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "3 1\n3 2 1\n3\n",
        "expectedOutput": "YES\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    arr = [int(x) for x in tokens[1:n+1]]\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    if (cin >> n) {\n        vector<long long> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            long[] arr = new long[n];\n            for (int i = 0; i < n; i++) arr[i] = sc.nextLong();\n            \n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = parseInt(tokens[0], 10);\n    const arr = tokens.slice(1, n + 1).map(x => BigInt(x));\n    \n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-068": {
    "title": "Count Pairs with XOR in Range",
    "difficulty": "Hard",
    "order": 68,
    "progressionStage": "Interview / Placement",
    "tags": [
      "Bit Manipulation",
      "Count"
    ],
    "description": "Given array $A$ and range $[L, R]$, count pairs $(i, j)$ with $i < j$ such that $L \\le A[i] \\oplus A[j] \\le R$.",
    "inputFormat": "First line contains N, L, and R. Second line contains N integers.",
    "outputFormat": "Print the computed result on a single line.",
    "constraints": [
      "1 <= N <= 100000",
      "0 <= A[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "4 2 6\n1 4 2 7",
        "output": "6",
        "explanation": "Number of pairs with XOR in range [2, 6]."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "4 2 6\n1 4 2 7\n",
        "expectedOutput": "6\n",
        "label": "Example 1"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "5 1 5\n9 8 4 2 1\n",
        "expectedOutput": "3\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    arr = [int(x) for x in tokens[1:n+1]]\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    if (cin >> n) {\n        vector<long long> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            long[] arr = new long[n];\n            for (int i = 0; i < n; i++) arr[i] = sc.nextLong();\n            \n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = parseInt(tokens[0], 10);\n    const arr = tokens.slice(1, n + 1).map(x => BigInt(x));\n    \n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-069": {
    "title": "Maximum Genetic Difference Query",
    "difficulty": "Hard",
    "order": 69,
    "progressionStage": "Interview / Placement",
    "tags": [
      "Bit Manipulation",
      "Maximum"
    ],
    "description": "Given a tree with node values and queries $(node, val)$, find maximum $val \\oplus u$ along the root-to-node path using a binary Trie. Print space-separated answers.",
    "inputFormat": "First line contains N and Q. Second line contains parent node array. Next Q lines contain node and val.",
    "outputFormat": "Print the computed result on a single line.",
    "constraints": [
      "1 <= N <= 100000",
      "0 <= A[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "5 3\n-1 0 1 0 3\n2 7\n3 2\n0 3",
        "output": "7 2 3",
        "explanation": "Max genetic difference query answers."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "5 3\n-1 0 1 0 3\n2 7\n3 2\n0 3\n",
        "expectedOutput": "7 2 3\n",
        "label": "Example 1"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "3 2\n-1 0 0\n1 5\n2 5\n",
        "expectedOutput": "5 7\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    arr = [int(x) for x in tokens[1:n+1]]\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    if (cin >> n) {\n        vector<long long> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            long[] arr = new long[n];\n            for (int i = 0; i < n; i++) arr[i] = sc.nextLong();\n            \n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = parseInt(tokens[0], 10);\n    const arr = tokens.slice(1, n + 1).map(x => BigInt(x));\n    \n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-071": {
    "title": "Kth Smallest XOR Coordinate Value",
    "difficulty": "Medium",
    "order": 71,
    "progressionStage": "Interview / Placement",
    "tags": [
      "Bit Manipulation",
      "Kth"
    ],
    "description": "Given matrix $M$, compute prefix XOR matrix $P[i][j]$ and find the $K$-th largest coordinate value.",
    "inputFormat": "First line contains M, N, and K. Following M lines contain N integers.",
    "outputFormat": "Print the computed result on a single line.",
    "constraints": [
      "1 <= N <= 100000",
      "0 <= A[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "2 2 1\n5 2\n1 6",
        "output": "7",
        "explanation": "Kth largest XOR coordinate value."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "2 2 1\n5 2\n1 6\n",
        "expectedOutput": "7\n",
        "label": "Example 1"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "2 2 2\n5 2\n1 6\n",
        "expectedOutput": "5\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    arr = [int(x) for x in tokens[1:n+1]]\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    if (cin >> n) {\n        vector<long long> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            long[] arr = new long[n];\n            for (int i = 0; i < n; i++) arr[i] = sc.nextLong();\n            \n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = parseInt(tokens[0], 10);\n    const arr = tokens.slice(1, n + 1).map(x => BigInt(x));\n    \n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-072": {
    "title": "Connect Two Groups of Points Bitmask DP",
    "difficulty": "Hard",
    "order": 72,
    "progressionStage": "Interview / Placement",
    "tags": [
      "Bit Manipulation",
      "Connect"
    ],
    "description": "Given cost matrix between Group 1 and Group 2, find minimum cost to connect all points in both groups using bitmask DP.",
    "inputFormat": "First line contains N. Following N lines contain N space-separated integers.",
    "outputFormat": "Print the computed result on a single line.",
    "constraints": [
      "1 <= N <= 100000",
      "0 <= A[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "4\n0 10 15 20\n10 0 35 25\n15 35 0 30\n20 25 30 0",
        "output": "0",
        "explanation": "Minimum cost tour for 4 cities."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "4\n0 10 15 20\n10 0 35 25\n15 35 0 30\n20 25 30 0\n",
        "expectedOutput": "0\n",
        "label": "Example 1"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "3\n0 1 2\n1 0 3\n2 3 0\n",
        "expectedOutput": "0\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    arr = [int(x) for x in tokens[1:n+1]]\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    if (cin >> n) {\n        vector<long long> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            long[] arr = new long[n];\n            for (int i = 0; i < n; i++) arr[i] = sc.nextLong();\n            \n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = parseInt(tokens[0], 10);\n    const arr = tokens.slice(1, n + 1).map(x => BigInt(x));\n    \n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-073": {
    "title": "Smallest Sufficient Team Exact Cover",
    "difficulty": "Hard",
    "order": 73,
    "progressionStage": "Interview / Placement",
    "tags": [
      "Bit Manipulation",
      "Smallest"
    ],
    "description": "Find the minimum number of people whose combined skills cover all required skills using bitmask BFS/DP.",
    "inputFormat": "First line contains S and P. Second line contains S required skills. Next P lines contain skills for each person.",
    "outputFormat": "Print the computed result on a single line.",
    "constraints": [
      "1 <= N <= 100000",
      "0 <= A[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "3 3\njava nodejs reactjs\n1 java\n1 nodejs\n2 nodejs reactjs",
        "output": "2",
        "explanation": "Smallest sufficient team size."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "3 3\njava nodejs reactjs\n1 java\n1 nodejs\n2 nodejs reactjs\n",
        "expectedOutput": "2\n",
        "label": "Example 1"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "2 2\na b\n1 a\n1 b\n",
        "expectedOutput": "2\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    arr = [int(x) for x in tokens[1:n+1]]\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    if (cin >> n) {\n        vector<long long> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            long[] arr = new long[n];\n            for (int i = 0; i < n; i++) arr[i] = sc.nextLong();\n            \n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = parseInt(tokens[0], 10);\n    const arr = tokens.slice(1, n + 1).map(x => BigInt(x));\n    \n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  },
  "19-bit-manipulation-074": {
    "title": "Chalkboard XOR Game",
    "difficulty": "Hard",
    "order": 74,
    "progressionStage": "Interview / Placement",
    "tags": [
      "Bit Manipulation",
      "Chalkboard"
    ],
    "description": "Alice and Bob play a game erasing numbers. A player loses if erasing makes total XOR 0. Print `Alice` if Alice wins with optimal play, otherwise `Bob`.",
    "inputFormat": "First line contains integer $N$. Second line contains $N$ space-separated integers.",
    "outputFormat": "Print the computed result on a single line.",
    "constraints": [
      "1 <= N <= 100000",
      "0 <= A[i] <= 10^9"
    ],
    "examples": [
      {
        "input": "5\n1 2 3 4 5",
        "output": "Bob",
        "explanation": "Result for array [1, 2, 3, 4, 5]."
      },
      {
        "input": "6\n3 10 5 25 2 8",
        "output": "Alice",
        "explanation": "Result for array [3, 10, 5, 25, 2, 8]."
      }
    ],
    "visibleTests": [
      {
        "id": "v1",
        "input": "5\n1 2 3 4 5\n",
        "expectedOutput": "Bob\n",
        "label": "Example 1"
      },
      {
        "id": "v2",
        "input": "6\n3 10 5 25 2 8\n",
        "expectedOutput": "Alice\n",
        "label": "Example 2"
      }
    ],
    "hiddenTests": [
      {
        "id": "h1",
        "input": "4\n7 7 7 7\n",
        "expectedOutput": "Alice\n",
        "isHidden": true
      },
      {
        "id": "h2",
        "input": "5\n4 2 9 15 30\n",
        "expectedOutput": "Bob\n",
        "isHidden": true
      }
    ],
    "starterCode": {
      "python": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    arr = [int(x) for x in tokens[1:n+1]]\n    \n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    solve()\n",
      "cpp": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    if (cin >> n) {\n        vector<long long> arr(n);\n        for (int i = 0; i < n; i++) cin >> arr[i];\n        \n        // Write your solution here\n    }\n    return 0;\n}\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            long[] arr = new long[n];\n            for (int i = 0; i < n; i++) arr[i] = sc.nextLong();\n            \n            // Write your solution here\n        }\n    }\n}\n",
      "javascript": "'use strict';\nconst fs = require('fs');\n\nfunction solve() {\n    const input = fs.readFileSync(0, 'utf8').trim();\n    if (!input) return;\n    const tokens = input.split(/\\s+/);\n    const n = parseInt(tokens[0], 10);\n    const arr = tokens.slice(1, n + 1).map(x => BigInt(x));\n    \n    // Write your solution here\n}\n\nsolve();\n"
    },
    "status": "published",
    "isDraft": false
  }
};
