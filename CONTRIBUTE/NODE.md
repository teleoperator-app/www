## Node Install



Po zapisaniu pliku `package.json`, uruchom następującą komendę w terminalu, aby zainstalować wszystkie zależności:

```sh
cd src
```

```sh
npm install
```

To upgrade all the dependencies in your `package.json` to their latest versions, you can follow these steps:

### Using npm (version 5.2 or higher)

1. **Install `npm-check-updates`:**
   First, you need to install the `npm-check-updates` tool globally. This tool helps you to easily upgrade the dependencies in your `package.json` to the latest versions.

   ```sh
   sudo npm install -g npm-check-updates
   ```

   ```sh
   sudo npm install -g npm@10.8.1
   ```
2. **Update `package.json` Dependencies:**
   Once `npm-check-updates` is installed, run the following command to upgrade your `package.json` dependencies:

   ```sh
   ncu -u
   ```

   The `ncu -u` command checks your `package.json` file for any outdated dependencies and updates them to the latest versions.

3. **Install Updated Dependencies:**
   After updating the `package.json` file, install the updated packages using:

   ```sh
   npm install
   ```

### Using yarn

If you prefer to use `yarn`, you can update all dependencies to their latest versions as follows:

1. **Upgrade Dependencies:**
   Run the following command to upgrade all the dependencies listed in your `package.json` file:

   ```sh
   yarn upgrade --latest
   ```

### Manual Method

Alternatively, you could manually update the `package.json` file and then install the dependencies:

1. **Update Versions in `package.json`:**
   Manually change the version numbers of the dependencies in your `package.json` file to the latest versions. You can look up the latest versions on npm's website or by running:

   ```sh
   npm show <package-name> version
   ```

2. **Install Dependencies:**
   After updating the `package.json` file, run the following command to install the updated packages:

   ```sh
   npm install
   ```

### After Upgrading

After upgrading your dependencies, it's a good practice to:

1. **Check for breaking changes:**
   Review the changelogs of the dependencies to be aware of any breaking changes that might require code modifications.

2. **Test your application:**
   Thoroughly test your application to ensure everything works correctly with the updated dependencies.

3. **Lockfile Update:**
   If you use a lockfile (`package-lock.json` or `yarn.lock`), make sure it is updated by the package manager.

Following these steps should help you successfully upgrade all the packages in your `package.json` to their newest versions.
