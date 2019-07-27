# -*- mode: ruby -*-
# vi: set ft=ruby :

# plugins:
#   - vagrant-disksize
#   - vagrant-vbguest

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/bionic64"
  # config.vm.synced_folder "vagrant_provision/", "/vagrant_provision"
  config.vm.provision :shell, path: "provision.sh"
  config.vm.provider "virtualbox" do |v|
    v.memory = 4096
    v.cpus = 2
  end
  # config.disksize.size = "20GB"
  config.vm.network "forwarded_port", guest: 8000, host: 8000
end
