---
title: Users and permissions
description: Give WordPress users access to the CRM, and choose exactly what each of them can see and change.
sidebar:
  order: 11
---

Marker CRM doesn't use WordPress roles to decide who can do what. You give each WordPress user
access here, and tick the permissions they need.

Open it from **Settings → Users and permissions**.

![The Users and permissions list, with each user's name, role, email and permissions, and the Add user button](/images/placeholder.svg)

## Who has access

- **WordPress administrators** — anyone who can manage the site's options — always have every
  permission. They aren't listed here, and you can't limit them.
- **Everyone else** has no access until you add them here. Once they have at least one
  permission, **Marker CRM** appears in their WordPress admin menu, showing only the screens
  their permissions allow.

## Give someone access

1. Click **Add user**.
2. Under **User**, type at least three letters of their email address and pick them. The search
   only finds WordPress users who aren't administrators and don't have access yet.
3. Tick their permissions. **Check all** ticks everything; the box beside each group ticks
   that whole group.
4. Click **Add**.

They need an existing WordPress account. To add someone new, create their account under
**Users → Add New** in WordPress first. The **Subscriber** role is enough.

## The permissions

| Group | Permissions |
|---|---|
| **Dashboard** | **Manage** — see the dashboard. |
| **Contacts** | **View**, **Edit**, **Delete**, **Import**, **Export** |
| **Companies** | **View**, **Edit**, **Delete**, **Import**, **Export**. Only listed while the Companies [add-on](/add-ons/) is on. |
| **Tags, lists & segments** | **View**, **Edit**, **Delete** |
| **Custom fields** | **View**, **Edit**, **Delete** |
| **Campaigns & templates** | **View**, **Edit**, **Delete**, **Send** |
| **Automations** | **View**, **Edit**, **Delete** |
| **Logs** | **View**, **Delete** |
| **Reports** | **View** |
| **Settings** | **Manage** — every screen under **Settings**, plus **Add-ons**. |

### Some permissions include others

Ticking a permission also ticks the ones it needs. Those show a lock and the word
**Implied**:

- **Edit** includes **View**.
- **Delete**, **Import** and **Send** include **Edit**, and so **View** too.
- **Export** includes **View**.

So a user with **Campaigns & templates → Send** can also edit and view campaigns.

:::caution[Give Export and Settings sparingly]
**Export** lets someone download your contact data. **Settings** lets them change how email
is sent, manage webhooks and give permissions to other people. Give these only to people who
need them.
:::

## Edit or remove access

Each row's menu has:

- **Edit permissions** — change what they can do, then **Save**.
- **Remove access** — they keep their WordPress account but lose the CRM.

The menu isn't shown on your own row. You can't change your own permissions.

## Managers who aren't administrators

Someone with **Settings → Manage** can add and edit other users, but they can only give
permissions they hold themselves. A manager without **Export** can't give **Export** to
someone else.

## Examples

| Role | Permissions to tick |
|---|---|
| Marketer | **Contacts → Export**, **Tags, lists & segments → Edit**, **Campaigns & templates → Send**, **Automations → Edit**, **Reports → View** |
| Support agent | **Contacts → Edit**, **Logs → View** |
| Read-only reviewer | **Dashboard → Manage**, **Contacts → View**, **Reports → View** |
