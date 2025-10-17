const fs = require('fs');

const filePath = './build/index.html';
const content = fs.readFileSync(filePath, 'utf-8');


const linkItem = content.replace(
  'src="/assets/',
  'src="/build/assets/'
  // 'src="<?php echo get_template_directory_uri(); ?>/build/assets/'
).replace(
  'href="/assets/',
  'href="/build/assets/'
  // 'href="<?php echo get_template_directory_uri(); ?>/build/assets/'
);


// fs.writeFileSync(filePath, linkItem);
// fs.renameSync(filePath, './build/index.html');
