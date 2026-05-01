# Plan: User System

## 任務
Implement User System - local profiles and reading history

## 功能需求
- Local user profiles (localStorage)
- Reading history sync
- Favorite books collection

## 驗收標準
- [x] Can set nickname
- [x] Reading history persists
- [x] Can favorite/unfavorite books
- [x] Continue reading shows recent books

## 預期時間
15 分鐘（PDCA 循環）

---

## Step 1: User Profile Store
File: `src/scripts/user-profile.ts`
- createProfile(), getProfile(), updateProfile()

## Step 2: Add Favorites to UI
In book cards - add heart/star icon to toggle favorite

## Step 3: Update Index Page
Add "Continue Reading" section with history

## Step 4: My Page Enhancement
Show user profile, favorites, reading stats