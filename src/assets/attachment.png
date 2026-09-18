Design a complete, modern web application UI for a cloud storage platform.

The application must have a clean, minimalist, professional SaaS interface. The design should feel like a real modern cloud storage product, with strong visual hierarchy, generous spacing, consistent components, and simple navigation.

IMPORTANT:

* Do not add functionality that is not explicitly described below.
* Do not invent additional features.
* The application is a cloud storage web application.
* The interface must be realistic and implementable in React.
* Create a consistent design system across all screens.
* Prioritize usability and simplicity over decorative elements.

## 1. Overall visual style

Use a Clean Minimal / Modern SaaS visual style.

Visual characteristics:

* very light neutral background;
* white content surfaces/cards;
* dark navy/charcoal primary text;
* muted gray secondary text;
* one primary accent color;
* subtle borders;
* very subtle shadows;
* moderately rounded corners;
* clean outline icons;
* modern sans-serif typography, preferably Inter;
* generous whitespace;
* no excessive gradients;
* no excessive decorative illustrations;
* no unnecessary visual effects.

Suggested color system:

Background: #F8FAFC
Surface: #FFFFFF
Primary text: #0F172A
Secondary text: #64748B
Border: #E2E8F0
Primary accent: #4F46E5

Use the accent color consistently for:

* primary buttons;
* active navigation items;
* progress indicators;
* selected states;
* important interactive elements.

Use consistent spacing, typography, border radius, shadows, buttons, inputs, cards, tables, dialogs and icons throughout the entire application.

---

# 2. Authentication

Create the following authentication screens:

* Login
* Register
* Forgot Password / Password Reset
* 2FA Verification

Authentication screens should use a centered card layout.

Structure:

Application logo/name
Page title
Short supporting text
Form fields
Primary action button
Secondary navigation link

Keep the authentication interface simple and focused.

The 2FA screen should follow exactly the same visual language as Login and Register, with a centered verification-code input and primary verification action.

Do not add social login or other authentication methods.

---

# 3. Main application layout

After authentication, use a persistent application layout consisting of:

* left sidebar;
* top navigation bar;
* main content area.

Desktop structure:

┌──────────────────────────────────────────────────────────────┐
│ Logo       Search                         Notifications User │
├───────────────┬──────────────────────────────────────────────┤
│               │                                              │
│ Dashboard     │                                              │
│ My Files      │              Main Content                    │
│ Shared        │                                              │
│ Recycle Bin   │                                              │
│ Notifications │                                              │
│ Settings      │                                              │
│               │                                              │
└───────────────┴──────────────────────────────────────────────┘

The sidebar should be visually quiet and compact.

Use simple outline icons next to navigation labels.

The active navigation item should have:

* subtle accent-colored background;
* accent-colored icon;
* accent-colored text.

---

# 4. Top navigation bar

Create a clean top bar.

Include:

* application logo/name;
* full-text search field;
* notification access;
* user area.

The search field should be wide enough to be a major element of the top bar but should not dominate the interface.

Use a search icon inside the field.

The user area should be visually compact.

Do not add additional top-bar functionality.

---

# 5. Dashboard

Create a Dashboard page that provides a visual overview of cloud storage usage.

Top section:

Dashboard title
Short descriptive subtitle

Then create storage and statistics sections.

## Storage card

Create a prominent storage card showing:

* used storage;
* total storage;
* available storage;
* visual progress bar.

Example:

Storage

68 GB of 100 GB

████████████████░░░░

The progress bar should use the primary accent color.

## Usage statistics

Create visual charts showing storage distribution by file type.

File categories:

* Images
* Documents
* Videos
* Audio
* Other

Keep the charts minimalist and easy to understand.

## Recent files

Create a compact recent-files list/table.

Each item should show:

* file icon or thumbnail;
* file name;
* file type;
* file size;
* date.

Use clear visual hierarchy so that the file name is the most prominent information.

---

# 6. My Files

Create the primary file-management screen.

Header:

My Files                                      + Upload

The Upload button should be the primary action and use the accent color.

Below the header, include the drag-and-drop upload area.

Create a subtle dashed-border upload zone:

┌──────────────────────────────────────────────┐
│                                              │
│             Drag & Drop files here           │
│                                              │
│                 or Upload files              │
│                                              │
└──────────────────────────────────────────────┘

The upload area should be visually clear but compact enough that it does not dominate the file list.

---

# 7. File list

Create a clean file table/list.

Columns:

Name
Type
Size
Modified

Example:

Name                 Type       Size       Modified

PDF icon  report.pdf PDF        2.4 MB     Today
Image     photo.png  Image      1.8 MB     Yesterday
Text      notes.txt  Text       12 KB      Sep 17

Use:

* thumbnails for image files;
* file-type icons for other files;
* clear file names;
* muted secondary information.

Keep rows spacious and easy to scan.

---

# 8. Sorting and filtering

Place sorting and filtering controls above the file list.

Example:

Sort by: Name ▼
Filter: All files ▼

Sorting options:

* Name
* Date
* Size
* Type

Filtering options should correspond to file types.

The controls should be compact dropdown/select components and visually secondary to the Upload button.

---

# 9. File preview

Create a file-preview modal or side panel.

The preview should allow users to see:

* images;
* PDF files;
* text files.

The preview should open above the existing application without navigating away from the current file-management context.

## Image preview

Display the image centered inside a clean preview area.

## PDF preview

Display the PDF inside a document viewer area.

## Text preview

Display text inside a readable content area.

Use a clean header for the preview containing the file name.

---

# 10. Upload and download progress

Create visual progress states for file transfers.

Example:

Uploading photo.zip

██████████████░░░░░░ 72%

72%

Use a progress bar with percentage information.

Create equivalent visual treatment for downloading files.

The progress component should be compact and unobtrusive while still clearly communicating that the transfer is active.

---

# 11. Search

The global search field is located in the top navigation.

Create search-result states showing matching files.

Search results should use the same file-list visual language as My Files.

Support:

* searching by file name;
* full-text search within file content where applicable.

Search results should clearly show the matching file and relevant information.

---

# 12. Folders and hierarchical organization

Inside My Files, visually distinguish folders from files.

Use folder icons.

Support hierarchical navigation using breadcrumbs.

Example:

My Files / Projects / PBL

Breadcrumbs should be located above the file list and should clearly indicate the user's current folder.

Folders and files should use the same overall list design so the interface remains consistent.

---

# 13. Recycle Bin

Create a Recycle Bin page using the same layout and file-list design as My Files.

Display deleted files in a visually recognizable but still clean manner.

The page should clearly distinguish deleted files from normal active files.

Maintain consistency with the rest of the application.

---

# 14. File version history

Create a version-history modal or side panel associated with a file.

Example:

Version History

Version 3       Today       2.4 MB
Version 2       Sep 16      2.1 MB
Version 1       Sep 14      1.8 MB

Each version should clearly display:

* version number;
* date;
* file size.

The current version should have a subtle visual distinction.

Keep the interface compact and easy to scan.

---

# 15. Shared with me

Create a "Shared with me" page using the same file-list structure.

Files shared with the current user should be displayed consistently with other files.

Use the existing file information hierarchy.

Do not introduce additional sharing functionality beyond the existing sharing concept.

---

# 16. Comments

Create a comments panel associated with a file.

Structure:

Comments

User
Comment text...
Today

User
Comment text...
Yesterday

[ Write a comment... ]

Comments should appear as simple vertically stacked items.

Separate comments visually using subtle spacing or dividers.

Keep the comments interface clean and readable.

---

# 17. Notifications

Create a Notifications page.

Display notifications as a clean vertical list.

Notification examples correspond only to the specified functionality:

* a file was shared with the user;
* someone commented on a file;
* storage is almost full.

Each notification should contain:

* icon;
* notification text;
* date/time;
* read/unread visual state.

Unread notifications should have a subtle visual distinction.

---

# 18. Settings

Create a Settings page using the same application layout.

Organize the settings interface into:

* Profile
* Security / 2FA
* Appearance

The Settings interface should use simple cards or sections with clear headings.

## Security / 2FA

Provide the visual interface for managing the existing 2FA functionality.

## Appearance

Provide the interface for switching between:

* Light theme;
* Dark theme.

---

# 19. Dark theme

Create a complete dark-theme version of the application.

Maintain the exact same layout and components as the light theme.

Dark theme palette:

* very dark background;
* dark gray surfaces;
* light primary text;
* muted gray secondary text;
* same accent color;
* subtle borders.

Do not redesign the application for dark mode. Only adapt the visual theme.

---

# 20. Responsive design

Design responsive layouts for:

* desktop;
* tablet;
* mobile.

Desktop should use the full sidebar + top bar + main content structure.

On smaller screens, the layout should adapt while preserving the same navigation and content hierarchy.

File lists should remain usable on narrow screens.

Cards, tables, upload areas, preview panels and statistics should resize naturally.

---

# 21. Component design system

Create reusable components that can easily be implemented in React.

Components should include:

* Button
* Secondary Button
* Input
* Search Input
* Select / Dropdown
* Sidebar Navigation Item
* File Row
* Folder Row
* File Thumbnail
* File Type Icon
* Storage Progress Bar
* Upload Progress
* Download Progress
* Card
* Modal
* Side Panel
* Breadcrumb
* Notification Item
* Comment Item
* Chart Container
* Theme Selector

All components must use consistent:

* spacing;
* typography;
* border radius;
* borders;
* shadows;
* icon style;
* colors;
* hover states;
* active states;
* disabled states.

---

# 22. Figma structure

Organize the Figma file logically.

Create separate sections/pages for:

1. Design System
2. Authentication
3. Dashboard
4. My Files
5. File Preview
6. Shared with me
7. Recycle Bin
8. Notifications
9. Settings
10. Dark Theme
11. Responsive Views

Use reusable components and variants wherever possible.

Create desktop and mobile versions for the main screens.

Use Auto Layout consistently.

Use an 8px-based spacing system.

Use a clear type hierarchy:

* Large page title
* Section heading
* Body text
* Secondary text
* Small metadata

Keep the entire application visually consistent.

The final result should look like a polished, minimalist cloud storage SaaS interface that can realistically be implemented using React, without unnecessary visual complexity or functionality beyond the specified requirements.
