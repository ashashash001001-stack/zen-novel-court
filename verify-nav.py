#!/usr/bin/env python3
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    # Try different URLs
    urls = [
        "http://localhost:4324/book/%E4%B8%80%E8%8C%B6%E4%B8%80%E7%A6%85-%E6%B5%B7%E9%AE%AE%E5%AF%92%E7%9A%84%E9%9D%99%E5%BF%83%E8%8C%B6%E8%B7%AF/1/",
        "http://localhost:4324/book/一茶一禪-海鮮僧的靜心茶路/1/",
        "http://localhost:4324/zen-novel-court/book/一茶一禪-海鮮僧的靜心茶路/1/",
    ]

    for url in urls:
        print(f"Testing: {url}")
        response = page.goto(url, wait_until="domcontentloaded")
        print(f"  Status: {response.status}")
        if response.status == 200:
            # Check for "更多" button
            more_btn = page.locator('#toolBtnMore')
            if more_btn.count() > 0:
                print(f"  ✅ Found '更多' button!")
                # Take screenshot
                page.screenshot(path='/tmp/chapter-page.png', full_page=True)
                print(f"  Screenshot saved to /tmp/chapter-page.png")

                # Test clicking the more button
                more_btn.click()
                page.wait_for_timeout(500)

                # Check for the sheet
                sheet = page.locator('#moreSheet.active')
                if sheet.count() > 0:
                    print(f"  ✅ Sheet opened!")

                    # Check for nav items
                    nav_items = page.locator('.nav-item')
                    count = nav_items.count()
                    print(f"  Found {count} nav items:")
                    for i in range(count):
                        text = nav_items.nth(i).text_content()
                        print(f"    - {text}")

                    # Take screenshot of open sheet
                    page.screenshot(path='/tmp/sheet-open.png', full_page=True)
                    print(f"  Screenshot saved to /tmp/sheet-open.png")
                break
        else:
            print(f"  ❌ Page not found")

    browser.close()
    print("\nVerification complete!")