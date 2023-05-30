from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in sms_campaign/__init__.py
from sms_campaign import __version__ as version

setup(
	name="sms_campaign",
	version=version,
	description="Send sms through database query",
	author="Finesoft Afrika",
	author_email="info@finesoftafrika.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
